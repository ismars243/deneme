/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50:'#eef2ff', 100:'#e0e7ff', 400:'#818cf8', 500:'#6366f1', 600:'#4f46e5', 700:'#4338ca' },
        income: '#10b981',
        expense: '#ef4444',
      },
      fontFamily: {
        sans: ['-apple-system','BlinkMacSystemFont','Segoe UI','system-ui','sans-serif'],
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        slideUp: { from:{ transform:'translateY(100%)', opacity:'0' }, to:{ transform:'translateY(0)', opacity:'1' } },
        fadeIn: { from:{ opacity:'0' }, to:{ opacity:'1' } },
        scaleIn: { from:{ transform:'scale(0.95)', opacity:'0' }, to:{ transform:'scale(1)', opacity:'1' } },
      },
    },
  },
  plugins: [],
}
