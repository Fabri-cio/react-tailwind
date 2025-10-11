import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // Cambia si tu app no está en la raíz del dominio
  build: {
    target: "esnext",
    minify: "esbuild",
    outDir: "dist",
    sourcemap: false, // Evita generar mapas en producción
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Separar librerías externas en un chunk
          }
        },
      },
    },
  },
});
