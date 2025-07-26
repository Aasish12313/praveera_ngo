/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out',
        slideUp: 'slideUp 0.4s ease-out',
        scroll: 'scroll 20s linear infinite',
        blob: 'blob 20s infinite',
        'blob-motion': 'blob-motion 20s ease-in-out infinite',
        'wave-motion': 'wave-motion 12s ease-in-out infinite',
        particle: 'particle 10s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'blob-motion': {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
        },
        'wave-motion': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        particle: {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(-200px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
