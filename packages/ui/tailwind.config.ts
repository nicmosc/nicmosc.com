import { nextui } from '@nextui-org/react';
import sharedConfig from '@nicmosc/config/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<
  Config,
  'prefix' | 'presets' | 'content' | 'plugins' | 'darkMode' | 'corePlugins'
> = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  presets: [sharedConfig],
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};

export default config;
