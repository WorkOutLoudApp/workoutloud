/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      textColor: {
        DEFAULT: '#000000', // <p className="text">This text will be the default color.</p>
        'dark': '#e0e0e0', // <p className="text-dark">This text will be white in dark mode.</p>
      },
      colors: {
        'primary': {
          DEFAULT: '#ffffff',
          dark: '#18191a',
        },
        'primary-variant': {
          DEFAULT: '#ffffff',
          dark: '#222121',
        },
        'secondary': {
          DEFAULT: '#4F46E6',
          dark: '#FF9900'
        },
        'background': {
          DEFAULT: '#E5E7EB',
          dark: '#384152',
        },
        'icon': {
          DEFAULT: '#000000',
          dark: '#e0e0e0',
          'active': {
            DEFAULT: '#4F46E6',
            dark: '#FF9900'
          }
        },
        
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}