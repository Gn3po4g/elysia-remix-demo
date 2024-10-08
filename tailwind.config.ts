import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
  content: ['app/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['emerald'],
  },
} satisfies Config;
