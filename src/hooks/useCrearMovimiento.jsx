import { useMutation } from "@tanstack/react-query";
import { MovimientoAPI } from "../api/almacen.api";

export const useCrearMovimiento = () => {
  return useMutation({
    mutationFn: (nuevoMovimiento) => MovimientoAPI.create(nuevoMovimiento), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Movimiento creado con éxito");
    },
    onError: (error) => {
      console.error("Error al crear el Movimiento", error);
    },
  });
};
