import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist');
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'data.js', 'favicon.svg']) fs.copyFileSync(file, path.join(output, file));
fs.cpSync('assets', path.join(output, 'assets'), { recursive: true });
console.log('Built static site in dist/');
