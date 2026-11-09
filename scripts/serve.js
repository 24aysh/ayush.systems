import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff': 'font/woff', '.ttf': 'font/ttf' };
const publicFiles = new Set(['/index.html', '/styles.css', '/app.js', '/data.js', '/favicon.svg', '/assets/GeistMonoVF.woff', '/assets/Satoshi-Variable.ttf']);
const rootModule = /^\/[a-z0-9-]+\.js$/i;
const assetFile = /^\/assets\/[a-z0-9-]+\.(?:png|webp|svg|woff|ttf)$/i;

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const publicPath = pathname === '/' ? '/index.html' : pathname;
  if (!publicFiles.has(publicPath) && !rootModule.test(publicPath) && !assetFile.test(publicPath)) {
    res.writeHead(404).end('Not found');
    return;
  }
  const file = path.resolve(root, `.${publicPath}`);
  fs.readFile(file, (error, contents) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(contents);
  });
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
