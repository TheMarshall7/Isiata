import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#020202',
        surface: '#0A0A0A',
        'surface-raised': '#111111',
        'surface-overlay': '#161616',
        border: 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        geist: ['Geist', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      animation: {
        'reveal': 'reveal 1s cubic-bezier(0.2, 0.8, 0.2, 1) both',
        'border-beam': 'border-beam 4s linear infinite',
      },
      keyframes: {
        reveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
            filter: 'blur(8px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0)'
          },
        },
        'border-beam': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
