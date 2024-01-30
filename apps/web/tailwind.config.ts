import { nextui } from '@nextui-org/react';
import sharedConfig from '@nicmosc/config/tailwind.config';
import type { Config } from 'tailwindcss';

// TODO find a way to not need to include nextui UI config for each app
const config: Pick<Config, 'content' | 'presets' | 'plugins' | 'darkMode' | 'theme'> = {
  darkMode: 'class',
  content: ['./src/**/*.tsx', '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)'],
        secondary: ['var(--font-secondary)'],
      },
    },
  },
};

export default config;
