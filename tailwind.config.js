/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        aspire: {
          navy:        '#0C1F3F',
          'navy-light':'#162D52',
          green:       '#01D167',
          'green-dark':'#00AA52',
          blue:        '#325BAF',
          'blue-light':'#EDF3FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
