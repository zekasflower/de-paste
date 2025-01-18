/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        light: {
          100: '#F2F2F2',
          400: '#666666',
          700: '#2D2D2D',
          900: '#141414',
        },
        dark: {
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          500: '#3D3D3D',
          600: '#383838',
          700: '#2D2D2D',
        },
      },
      fontFamily: {
        catamaran: ['catamaran', 'serif'],
      },
      zIndex: {
        '-1': '-1',
        100: '100'
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addVariant('child-focus', '& > *:focus');
    }
  ],
}

