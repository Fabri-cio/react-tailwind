import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoriasAPI } from "../api/producto.api";

export const useCrearCategoria = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nuevaCategoria) => CategoriasAPI.create(nuevaCategoria), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Categoria creada con éxito");

      queryClient.invalidateQueries("categorias"); // Invalida la caché de categorias
    },
    onError: (error) => {
      console.error("Error al crear la categoria", error);
    },
  });
};
