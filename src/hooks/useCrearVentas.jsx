// hooks/useCrearVenta.js

import { useMutation } from "@tanstack/react-query";
import { VentasAPI } from "../api/venta.api";

export const useCrearVenta = () => {
  return useMutation({
    mutationFn: VentasAPI.create, // Función para crear la venta
    onSuccess: () => {
      // Aquí puedes manejar el éxito de la operación
      console.log("Venta creada con éxito");
    },
    onError: (error) => {
      // Aquí puedes manejar los errores
      console.error("Error al crear la venta", error);
    },
  });
};
