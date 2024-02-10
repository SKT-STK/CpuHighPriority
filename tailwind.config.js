/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['Inconsolata', 'monospace']
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
