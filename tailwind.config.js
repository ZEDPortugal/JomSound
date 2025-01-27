/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { animation: {
      'fade-in': 'fadeIn 1s ease-in-out',
      'fade-out': 'fadeOut 1s ease-in-out',
      'slide-in-left': 'slideInLeft 0.5s ease-out',
      'slide-in-right': 'slideInRight 0.5s ease-out',
      'zoom-in': 'zoomIn 0.7s ease-in',
      'spin-slow': 'spin 3s linear infinite',
  },

  fontFamily: {
    sans: ['Montserrat', 'sans-serif'],
    michroma: ['Michroma', 'sans-serif'],
    newsCycle: ['"News Cycle"', 'sans-serif'],
  },


  keyframes: {
      fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
      },
      fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
      },
      slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
      },
      slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
      },
      zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
      },
  },},
  },
  plugins: [require('tailwindcss-animated')],
}

