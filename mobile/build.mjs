import { access, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const localSource = fileURLToPath(new URL('../letrin/', import.meta.url));
const repositorySource = fileURLToPath(new URL('../', import.meta.url));
let source = localSource;
try { await access(`${localSource}index.html`); }
catch { source = repositorySource; }
const output = fileURLToPath(new URL('./www/', import.meta.url));
const root = fileURLToPath(new URL('./', import.meta.url));
if (!output.startsWith(root) || output === root) throw Error('Unsafe build output');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'privacy.html', 'styles.css', 'app.js', 'language.js', 'letters.js', 'letters-en.js', 'letter-path.js', 'audio-catalog.js', 'soundtrack.js', 'audio.js', 'extra-games.js', 'premium-access.js', 'sw.js', 'manifest.json']) {
  await cp(`${source}${file}`, `${output}${file}`);
}
await cp(`${source}assets`, `${output}assets`, { recursive: true });
await build({ entryPoints: [fileURLToPath(new URL('./native-entry.mjs', import.meta.url))], outfile: `${output}native.js`, bundle: true, format: 'iife', target: 'es2020' });
const html = await readFile(`${output}index.html`, 'utf8');
if (!html.includes('<script src="premium-access.js?v=112"></script>')) throw Error('Letrín script loading changed');
await writeFile(`${output}index.html`, html.replace('<script src="premium-access.js?v=112"></script>', '<script src="native.js"></script>\n  <script src="premium-access.js?v=112"></script>'));
console.log('Letrín copied into the Android web bundle.');
