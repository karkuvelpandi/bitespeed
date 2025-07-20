import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './utils/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.css',
    ],
    theme: {
      extend: {
        colors: {
          brand: '#00d1ee',
        },
      },
    },
    plugins: [],
  };
  
export default config;