import { nextui } from '@nextui-org/react';
import sharedConfig from '@nicmosc/config/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets' | 'plugins' | 'darkMode'> = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};

export default config;
