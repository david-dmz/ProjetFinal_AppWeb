/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Active le mode sombre basé sur une classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scanne tes fichiers de composants
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // Ajoute les composants et utilitaires Flowbite
  ],
}

