import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ProductosAPI } from "../api/producto.api";

const useMutationWithToast = (mutationFn, loadingMsg, successMsg) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      toast.promise(mutationFn(data), {
        loading: loadingMsg,
        success: successMsg,
        error: (error) => `Error: ${error.response?.data?.detail || error.message}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["productos"]); // Refrescar la lista de productos
    },
    onError: (error) => {
      console.error("Error en la mutación:", error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["productos"]); // Intentar refetch después de éxito/error
    },
  });
};

export const useProductMutations = () => {
  const crearProducto = useMutationWithToast(
    ProductosAPI.create,
    "Creando producto...",
    "Producto creado con éxito 🎉"
  );

  const actualizarProducto = useMutationWithToast(
    ({ id, data }) => ProductosAPI.update(id, data),
    "Actualizando producto...",
    "Producto actualizado con éxito ✅"
  );

  return { crearProducto, actualizarProducto };
};
