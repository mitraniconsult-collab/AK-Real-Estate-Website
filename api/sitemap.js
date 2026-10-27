import seo from '../server/public-seo.cjs';
export async function GET() {
  try {
    return new Response(await seo.sitemap(), { headers: {
      'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=0, s-maxage=300'
    } });
  } catch (error) {
    console.error('Sitemap unavailable');
    return new Response('Sitemap temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } });
  }
}
