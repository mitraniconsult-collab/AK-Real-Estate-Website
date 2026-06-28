// notify-inquiry — Supabase Edge Function (Deno).
//
// Sends an email notification to the agency when a new public contact inquiry is
// submitted. The inquiry itself is saved to `contact_inquiries` by the frontend
// BEFORE this is called; email is best-effort and must never block/fail the form.
//
// ── Setup ────────────────────────────────────────────────────────────────────
// Required Supabase secrets:
//   RESEND_API_KEY    — Resend API key (https://resend.com)
//   NOTIFY_TO_EMAIL   — recipient (fallback: office@akrealestatebg.com)
//   NOTIFY_FROM_EMAIL — verified sender (fallback: AK Real Estate <onboarding@resend.dev> for testing)
//
// Deploy:
//   supabase functions deploy notify-inquiry
//   supabase secrets set RESEND_API_KEY=...
//   supabase secrets set NOTIFY_TO_EMAIL=office@akrealestatebg.com
//   supabase secrets set NOTIFY_FROM_EMAIL="AK Real Estate <verified-sender@your-domain.com>"
//
// No secrets live in the repo or frontend — they are read from Deno.env at runtime.

const ALLOWED_ORIGINS = [
  "https://www.akrealestatebg.com",
  "https://akrealestatebg.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:8080",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Vary": "Origin",
  };
}

function json(payload: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : (v == null ? "" : String(v));
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400, cors);
  }

  const name = str(body.name);
  const phone = str(body.phone);
  const budget = str(body.budget);
  const interest = str(body.interest_label) || str(body.interest);
  const message = str(body.message);
  const langRaw = str(body.lang);
  const lang = langRaw === "en" ? "en" : (langRaw || "bg");
  const source = str(body.source) || "website_contact";

  // Minimal validation — must have at least a name and phone.
  if (!name || !phone) return json({ ok: false, error: "bad_request" }, 400, cors);

  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const TO = Deno.env.get("NOTIFY_TO_EMAIL") || "office@akrealestatebg.com";
  const FROM = Deno.env.get("NOTIFY_FROM_EMAIL") || "AK Real Estate <onboarding@resend.dev>";

  if (!RESEND_API_KEY) {
    // Sanitized: no submitted personal data in logs.
    console.error("notify-inquiry: RESEND_API_KEY is not configured");
    return json({ ok: false, error: "email_failed" }, 500, cors);
  }

  const isEn = lang === "en";
  const subject = isEn
    ? "New website inquiry · AK Real Estate"
    : "Ново запитване от сайта · AK Real Estate";
  const when = new Date().toISOString();
  const dash = "—";

  const L = isEn
    ? { name: "Name", phone: "Phone", budget: "Budget", interest: "Interest", message: "Message", lang: "Language", source: "Source", date: "Date/time", title: "New website inquiry" }
    : { name: "Име", phone: "Телефон", budget: "Бюджет", interest: "Интерес", message: "Съобщение", lang: "Език", source: "Източник", date: "Дата/час", title: "Ново запитване от сайта" };

  const rows: Array<[string, string]> = [
    [L.name, name],
    [L.phone, phone],
    [L.budget, budget || dash],
    [L.interest, interest || dash],
    [L.message, message || dash],
    [L.lang, lang],
    [L.source, source],
    [L.date, when],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;line-height:1.6;">
      <h2 style="font-weight:600;margin:0 0 16px;">${escapeHtml(L.title)} · AK Real Estate</h2>
      <table style="border-collapse:collapse;">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>
            <td style="padding:6px 0;white-space:pre-wrap;">${escapeHtml(v)}</td>
          </tr>`).join("")}
      </table>
    </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [TO], subject, text, html }),
    });

    if (!res.ok) {
      // Log status only — never the email body / personal data.
      console.error("notify-inquiry: Resend responded with status", res.status);
      return json({ ok: false, error: "email_failed" }, 502, cors);
    }

    return json({ ok: true }, 200, cors);
  } catch (e) {
    console.error("notify-inquiry: send error:", e instanceof Error ? e.message : "unknown error");
    return json({ ok: false, error: "email_failed" }, 500, cors);
  }
});
