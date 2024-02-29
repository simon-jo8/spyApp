module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'oswald': 'Oswald, sans-serif'
      },
      colors: {
        primary: '#1F1F1F',
        secondary: '#ffffff',
        highlight: '#0A98FF',
        red: '#850000',
      },
      screens: {
        'max-2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }

        'max-xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }

        'max-lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }

        'max-md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }

        'max-sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }

        'max-xs': {'max': '475px'},

        'xs': {'min': '476px'},

        'max-header': {'max': '909px'},

        'min-header': {'min': '910px'},
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}