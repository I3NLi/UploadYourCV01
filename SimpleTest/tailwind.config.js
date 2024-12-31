/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black1: "#333",
        white1: "#eee",
        gary1: '#888'
      }
    },
  },
  plugins: [],
}