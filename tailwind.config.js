/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-500': "#000957",
        'dark-400': "#344CB7",
        'dark-300': "#577BC1",
        'light-500': "#FFEB00",
      },
      fontFamily: {
        header: ['Mogra']
      }
    },
  },
  plugins: [],
}

