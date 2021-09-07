const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      orange: colors.orange,
      white: colors.white,
      black: colors.black,
      gray: colors.gray
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
