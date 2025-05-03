import sharedConfig from '@imkdw-dev-client/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [sharedConfig],
  content: ['./src/**/*.{ts,tsx}'],
};

export default config;
