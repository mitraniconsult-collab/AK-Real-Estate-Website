import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import seo from '../server/public-seo.cjs';
const template = readFileSync(join(process.cwd(), 'server/listing-template.html'), 'utf8');
export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const id = params.get('id');
  const headers = { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' };
  if (!id || !/^[a-zA-Z0-9_-]{1,80}$/.test(id)) return new Response(template, { status: 404, headers });
  try {
    const rows = await seo.listings({ select: 'id,status,title,title_en,description,description_en,city,city_en,images,main_image', id: `eq.${id}`, limit: '1' });
    if (!rows.length) return new Response(template, { status: 404, headers });
    return new Response(seo.metadata(template, rows[0], params.get('lang') === 'en' ? 'en' : 'bg'), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=60' }
    });
  } catch (error) {
    console.error('Listing metadata unavailable');
    return new Response(template, { status: 503, headers: { ...headers, 'Retry-After': '60' } });
  }
}
