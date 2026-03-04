import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050506',
        'bg-alt': '#0c0c0f',
        surface: '#111114',
        border: '#1e1e24',
        accent: '#f59e0b',
        'accent-15': 'rgba(245, 158, 11, 0.12)',
        'accent-30': 'rgba(245, 158, 11, 0.25)',
        'sw-red': '#ef4444',
        'sw-blue': '#3b82f6',
        'sw-green': '#22c55e',
        'sw-purple': '#8b5cf6',
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1aa',
        'text-tertiary': '#71717a',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
