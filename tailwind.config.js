/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      gilroy: ['Gilroy-ExtraBold', 'serif'],
      jura: ['Jura', 'san-serif'],
    },
    extend: {
      screens: {
        widescreen: { raw: '(min-aspect-ratio: 3/2)' },
        tallscreen: { raw: '(min-aspect-ratio: 13/20)' },
      },
    },
  },
  plugins: [],
};
