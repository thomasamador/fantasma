import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [tailwindcss()],
    build: {
        outDir: 'assets/built',
        emptyOutDir: true,
        sourcemap: true,
        watch: {
            exclude: ['assets/built/**'],
        },
        rollupOptions: {
            input: {
                screen: path.resolve(__dirname, 'assets/css/screen.css'),
                source: path.resolve(__dirname, 'assets/js/source.js'),
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name][extname]',
            },
        },
    },
});
