/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        smd: '400px',
      },
    },
  },
  plugins: [],
};