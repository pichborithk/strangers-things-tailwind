/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        widescreen: { raw: '(min-aspect-ratio: 3/2)' },
        tallscreen: { raw: '(min-aspect-ratio: 13/20)' },
      },
      fontFamily: {
        gilroy: ['Gilroy-ExtraBold', 'serif'],
        gilroyLight: ['Gilroy-Light', 'serif'],
        jura: ['Jura', 'san-serif'],
      },
      colors: {
        primary: { DEFAULT: '#eb455f' },
        secondary: { DEFAULT: '#fcffe7' },
        checked: { DEFAULT: '#1bca00' },
      },
      boxShadow: {
        full: '0px 1px 6px 1px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
