import { createWriteStream, mkdirSync, readFileSync } from 'fs';
import { glob } from 'glob';
import archiver from 'archiver';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const filename = `dist/${pkg.name}.zip`;

mkdirSync('dist', { recursive: true });

const output = createWriteStream(filename);
const archive = archiver('zip', { zlib: { level: 9 } });

const EXCLUDE = [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'scripts/**',
    'yarn-error.log',
    'yarn.lock',
    'package-lock.json',
    'vite.config.js',
    '**/*.map',
];

archive.pipe(output);

const files = await glob('**/*', { ignore: EXCLUDE, dot: false, nodir: true });
files.forEach(f => archive.file(f, { name: f }));

await archive.finalize();
console.log(`Created ${filename}`);
