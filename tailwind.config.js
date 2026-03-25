/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    //con esto agregamos estas clases
    //para poder usarlas en nuestro proyecto
    //en el caso de las animaciones
    //las usamos como animate-fade-in en el listado de calses
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        }
      },
      animation:{
        "fade-in": "fade-in 0.2s ease-in-out",
      }
    },
  },
  plugins: [],
}

