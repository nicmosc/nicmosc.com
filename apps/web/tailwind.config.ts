// tailwind config is required for editor support

import sharedConfig from '@nicmosc/config/tailwind.config';
import type { Config } from 'tailwindcss';

// TODO find a way to not need to include daisy UI config for each app
const config: Pick<Config, 'content' | 'presets' | 'plugins'> = {
  content: [
    './src/app/**/*.tsx',
    '../../node_modules/daisyui/dist/**/*.js',
    '../../node_modules/react-daisyui/dist/**/*.js',
  ],
  presets: [sharedConfig],
  plugins: [require('daisyui')],
};

export default config;
