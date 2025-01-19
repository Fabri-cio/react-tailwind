import { useMutation } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export const useCrearProducto = () => {
  return useMutation({
    mutationFn: (nuevoProducto) => ProductosAPI.create(nuevoProducto), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Producto creado con éxito");
    },
    onError: (error) => {
      console.error("Error al crear el Producto", error);
    },
  });
};
