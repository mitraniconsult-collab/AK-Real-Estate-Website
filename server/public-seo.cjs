const ORIGIN = 'https://www.akrealestatebg.com';
const URL_BASE = 'https://ylyilqwoiyirodigshgd.supabase.co/rest/v1/listings';
// The same public key as the browser. RLS remains in force; never use a service key here.
const PUBLIC_KEY = 'sb_publishable_wxCfqS0aCFRRXf0WgIhGzw_2SGd8tcL';
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function listings(params, fetcher = fetch) {
  const response = await fetcher(`${URL_BASE}?${new URLSearchParams({ ...params, status: 'neq.Draft' })}`, {
    headers: { apikey: PUBLIC_KEY }, signal: AbortSignal.timeout(7000)
  });
  if (!response.ok) throw Error(`Public listings unavailable (${response.status})`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw Error('Invalid listings response');
  return rows.filter(row => row.status !== 'Draft');
}
function metadata(template, row, lang = 'bg') {
  const field = key => String((lang === 'en' && row[`${key}_en`]) || row[key] || '');
  const title = `${field('title')} | AK Real Estate`;
  const description = (field('description').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() || [field('title'), field('city')].filter(Boolean).join(' — ')).slice(0, 180);
  const canonical = `${ORIGIN}/listing?id=${encodeURIComponent(row.id)}`;
  const images = Array.isArray(row.images) ? row.images : [];
  const image = [images[Number(row.main_image) || 0], ...images].find(src => typeof src === 'string' && /^https:\/\//i.test(src) && !/\.(mp4|webm|mov)(?:[?#]|$)/i.test(src));
  const tags = `<title>${escape(title)}</title>
  <meta name="description" content="${escape(description)}">
  <link rel="canonical" href="${escape(canonical)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:url" content="${escape(canonical)}">
  <meta property="og:locale" content="${lang === 'en' ? 'en_GB' : 'bg_BG'}">
  <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
  ${image ? `<meta property="og:image" content="${escape(image)}">` : ''}`;
  return template.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`).replace(/<title>[\s\S]*?<\/title>/, tags);
}
async function sitemap(fetcher = fetch) {
  const paths = ['/', '/listings', '/services', '/contact', '/terms', '/privacy', '/cookies'];
  for (let offset = 0; ; offset += 1000) {
    const rows = await listings({ select: 'id,status', order: 'id.asc', limit: '1000', offset: String(offset) }, fetcher);
    paths.push(...rows.map(row => `/listing?id=${encodeURIComponent(row.id)}`));
    if (rows.length < 1000) break;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>${escape(ORIGIN + path)}</loc></url>`).join('\n')}\n</urlset>`;
}
module.exports = { listings, metadata, sitemap, escape };
