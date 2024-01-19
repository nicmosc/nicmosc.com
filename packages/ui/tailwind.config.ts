import sharedConfig from '@nicmosc/config/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'plugins' | 'darkMode'> & {
  daisyui: {
    themes: string[];
  };
} = {
  darkMode: 'class',
  content: [
    './src/**/*.tsx',
    '../../node_modules/daisyui/dist/**/*.js',
    '../../node_modules/react-daisyui/dist/**/*.js',
  ],
  prefix: 'ui-',
  presets: [sharedConfig],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['sunset'],
  },
};

export default config;
