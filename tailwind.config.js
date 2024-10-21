/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // para desplegar ventana
  variants: {
    extend: {
      display: ["focus-group"],
    },
  },
};
