import { useQuery } from "@tanstack/react-query";
import { CategoriasAPI } from "../api/producto.api";

export const useCategorias = () => {
  return useQuery({
    queryKey: ["categorias"], // Llave única para esta consulta
    queryFn: CategoriasAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};
