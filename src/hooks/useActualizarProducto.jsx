import { useMutation } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export const useActualizarProducto = () => {
  return useMutation({
    mutationFn: ({ id, data }) => ProductosAPI.update(id, data), // Aseguramos que se pase correctamente el id y los datos
    onSuccess: () => {
      console.log("Producto actualizado con éxito");
    },
    onError: (error) => {
      console.error("Error al actualizar el Producto", error);
    },
  });
};
