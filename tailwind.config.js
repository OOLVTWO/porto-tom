/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07090F',
        panel: '#0D111B',
        raised: '#131927',
        line: '#222B3F',
        ink: '#E9ECF3',
        mute: '#8C95AB',
        dim: '#5A6378',
        ember: { DEFAULT: '#FF5A36', soft: '#FF8C6B', deep: '#C63A1C' },
        gold: '#F5C451',
        cyan: '#38D9F5',
        win: '#3BE38B',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        scan: 'scan 6s linear infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
