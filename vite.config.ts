import { vitePlugin as remix } from '@remix-run/dev';
import tailwind from 'tailwindcss';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import unocss from 'unocss/vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    // unocss(),
    remix({
      future: {
        unstable_singleFetch: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths()
  ],
  css: {
    postcss: { plugins: [tailwind()] },
  },
});
