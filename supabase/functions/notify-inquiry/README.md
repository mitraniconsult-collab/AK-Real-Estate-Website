# notify-inquiry

Supabase Edge Function that emails the agency when a new public contact inquiry is
submitted. The inquiry is saved to `contact_inquiries` by the website **before**
this function is called — email is best-effort and never blocks or fails the form.

## Required Supabase secrets

| Secret | Purpose | Fallback |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API key ([resend.com](https://resend.com)) | — (required) |
| `NOTIFY_TO_EMAIL` | Recipient address | `office@akrealestatebg.com` |
| `NOTIFY_FROM_EMAIL` | Verified sender | `AK Real Estate <onboarding@resend.dev>` (testing only) |

Secrets are read from `Deno.env` at runtime — none are stored in the repo or shipped
to the frontend.

## Deploy

```bash
supabase functions deploy notify-inquiry
supabase secrets set RESEND_API_KEY=...
supabase secrets set NOTIFY_TO_EMAIL=office@akrealestatebg.com
supabase secrets set NOTIFY_FROM_EMAIL="AK Real Estate <verified-sender@your-domain.com>"
```

> For production email delivery, verify your sending domain in Resend and set
> `NOTIFY_FROM_EMAIL` to an address on that domain. `onboarding@resend.dev` only
> works for testing to the Resend account owner.

## Request / response

- **POST** JSON body: `{ name, phone, budget?, interest?/interest_label?, message?, lang?, source? }`
- Requires at least `name` and `phone`.
- Returns `{ ok: true }` on success, or `{ ok: false, error: "email_failed" }`.

## CORS

Allows `https://www.akrealestatebg.com`, `https://akrealestatebg.com`, and common
localhost ports for local testing.

## Frontend call

`ui_kits/website/Contact.jsx` invokes it after a successful insert, fire-and-forget:

```js
window.akSupabase.functions.invoke('notify-inquiry', { body: payload });
```

A notification failure only logs a sanitized warning — the user still sees success
as long as the database insert succeeded.
