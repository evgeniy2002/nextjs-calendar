/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/5': '1fr 5fr',
      },
      keyframes: {
        bigPulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.1 },
        }
      },
      animation: {
        bigPulse: 'bigPulse 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
