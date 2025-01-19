import { useQuery } from "@tanstack/react-query";
import { CategoriasAPI } from "../api/producto.api";

export const useCategorias = () => {
  return useQuery({
    queryKey: ["categorias"], // Llave única para esta consulta
    queryFn: CategoriasAPI.getAll, // Función que devuelve los datos
  });
};
