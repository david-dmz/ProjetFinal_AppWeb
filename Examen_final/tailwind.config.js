/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scanne tes fichiers de composants
    "./node_modules/flowbite/**/*.js" // Indispensable : dit à Tailwind de scanner les classes de Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Ajoute les composants et utilitaires Flowbite
  ],
}

