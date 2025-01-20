import { useMutation } from "@tanstack/react-query";
import { InventarioAPI } from "../api/almacen.api";


export const useCrearInventario = () => {
  return useMutation({
    mutationFn: (nuevoInventario) => InventarioAPI.create(nuevoInventario), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Inventario creado con éxito");
    },
    onError: (error) => {
      console.error("Error al crear el Inventario", error);
    },
  });
};
