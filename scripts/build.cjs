// Compile JSX before deployment. The source HTML remains editable and unchanged.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const zlib = require('node:zlib');
const babel = require('@babel/standalone');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const excluded = new Set(['node_modules', 'dist', 'tests', 'scripts', 'supabase', 'api', 'server', 'screenshots']);
const allowed = /\.(html|css|js|svg|png|jpe?g|webp|avif|gif|ico|woff2?|ttf|mp4|webm|pdf|xml|txt)$/i;
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(path.join(output, 'assets/compiled'), { recursive: true });
fs.mkdirSync(path.join(output, 'assets/vendor'), { recursive: true });
for (const [pkg, name] of [['react', 'react'], ['react-dom', 'react-dom']]) {
  fs.copyFileSync(path.join(root, 'node_modules', pkg, 'umd', `${name}.production.min.js`), path.join(output, 'assets/vendor', `${name}-18.3.1.min.js`));
}
let pages = 0, compiledPages = 0, totalGzip = 0;
function htmlBuild(html, relative) {
  const base = html.match(/<base\b[^>]*href=["']([^"']+)["']/i)?.[1] || '/' + path.posix.dirname(relative) + '/';
  const chunks = [];
  let placeholder = false;
  html = html.replace(/<script\b([^>]*\btype=["']text\/babel["'][^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, inline) => {
    const src = attrs.match(/\bsrc=["']([^"']+)["']/i)?.[1];
    let code = inline;
    if (src) {
      const filename = path.resolve(root, '.' + new URL(src, 'https://build.invalid' + base).pathname);
      if (!filename.startsWith(root + path.sep)) throw Error('Invalid JSX path');
      code = fs.readFileSync(filename, 'utf8');
    }
    // Legacy scripts share declarations (including unexported UI helpers).
    // Keep that scope inside one page closure; lower block declarations to var.
    chunks.push(babel.transform(code, { presets: ['react'], plugins: ['transform-block-scoping'], comments: false, minified: true }).code);
    if (placeholder) return '';
    placeholder = true;
    return '<!-- AK_COMPILED_APP -->';
  });
  if (chunks.length) {
    const bundle = '(function(){\n' + chunks.join('\n') + '\n})();';
    const hash = crypto.createHash('sha256').update(bundle).digest('hex').slice(0, 16);
    const filename = `app-${hash}.js`;
    fs.writeFileSync(path.join(output, 'assets/compiled', filename), bundle);
    totalGzip += zlib.gzipSync(bundle).length;
    compiledPages++;
    html = html.replace('<!-- AK_COMPILED_APP -->', `<script defer src="/assets/compiled/${filename}"></script>`);
  }
  html = html.replace(/<script\b[^>]*src=["']https:\/\/unpkg\.com\/(react|react-dom)@18\.3\.1\/umd\/(?:react|react-dom)\.development\.js["'][^>]*><\/script>/gi,
    (_, pkg) => `<script src="/assets/vendor/${pkg}-18.3.1.min.js"></script>`);
  html = html.replace(/<script\b[^>]*src=["'][^"']*@babel\/standalone[^"']*["'][^>]*><\/script>/gi, '');
  if (/type=["']text\/babel|react\.development\.js|react-dom\.development\.js|@babel\/standalone/.test(html)) throw Error('Uncompiled page: ' + relative);
  pages++;
  return html;
}
function walk(directory, relative = '') {
  for (const file of fs.readdirSync(directory, { withFileTypes: true })) {
    if (file.name.startsWith('.') || excluded.has(file.name)) continue;
    const rel = path.posix.join(relative, file.name), absolute = path.join(directory, file.name);
    if (file.isDirectory()) { walk(absolute, rel); continue; }
    if (!allowed.test(file.name)) continue;
    const target = path.join(output, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (/\.html$/i.test(file.name)) fs.writeFileSync(target, htmlBuild(fs.readFileSync(absolute, 'utf8'), rel));
    else fs.copyFileSync(absolute, target);
  }
}
walk(root);
console.log(`Built ${pages} HTML pages; ${compiledPages} compiled React entry points (${Math.round(totalGzip / 1024)} KiB gzip combined).`);
