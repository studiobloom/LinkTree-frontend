/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purpleTheme: {
          light: '#D6BBFB',
          light2: '#d1beef', // Corrected hex color format
          DEFAULT: '#9F7AEA',
          dark: '#4C3BCF',
          dark2: '#4000a5',
          dark3: '#850F8D' // Corrected hex color format
        },
        paragraphColor: {
          white: '#F3F4F6',
        },
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #9F7AEA 0%, #6B46C1 100%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
