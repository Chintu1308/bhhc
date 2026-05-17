/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050f0a',
        primary: '#39d353', // lime green
        secondary: '#0dcfc0', // electric teal
        accent: '#00ff88', // neon green glow
        teal: '#00d4cc',
        textPrimary: '#e8fff4',
        textMuted: '#7aafa0',
        cardBg: 'rgba(0, 255, 136, 0.04)',
        cardBorder: 'rgba(0, 255, 136, 0.12)',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 255, 136, 0.15)',
        glowLg: '0 0 50px rgba(0, 255, 136, 0.25)',
      }
    },
  },
  plugins: [],
}

