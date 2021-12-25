const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    // colors: {
    //   ...colors,
    // },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        // sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
    },
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
