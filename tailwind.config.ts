import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#06050f',
        ink: '#0d0b1a',
        surface: '#110f22',
        gold: { DEFAULT: '#d4920a', light: '#f0b429', dim: 'rgba(212,146,10,0.1)', glow: 'rgba(212,146,10,0.25)' },
        cream: '#f5ede0',
        warm: '#c8b89a',
        ember: '#8b4513',
        border: 'rgba(212,146,10,0.12)',
        border2: 'rgba(245,237,224,0.06)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
