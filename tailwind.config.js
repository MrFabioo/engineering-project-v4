// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        'footer': 'calc(100% - 48px - 64px)',
      },
      minWidth: {
        '3/4': '75%',
      },
      backgroundColor: {
        'custom-rgba': 'rgba(0, 0, 0, 0.4)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
