import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"], // Llave única para esta consulta
    queryFn: ProductosAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Cachea por 5 minutos para mejorar rendimiento
  });
};
