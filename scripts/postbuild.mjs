// Give the SPA a real /h subpath (GitHub Pages + static servers): dist/h/index.html
// is the built index.html with relative asset URLs lifted one level.
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
const html = readFileSync('dist/index.html', 'utf8');
mkdirSync('dist/h', { recursive: true });
writeFileSync('dist/h/index.html', html.replace(/(src|href)="\.\//g, '$1="../'));
console.log('postbuild: dist/h/index.html written');
