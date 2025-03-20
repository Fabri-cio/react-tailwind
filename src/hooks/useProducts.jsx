import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export const useProducts = (all_data = false) => {
  return useQuery({
    queryKey: ["productos", all_data], // Añadimos `all_data` a la queryKey para que sea único
    queryFn: () => ProductosAPI.getAll(all_data), // Pasamos `all_data` a la función getAll
    staleTime: 1000 * 60 * 5, // Cachea por 5 minutos para mejorar rendimiento
  });
};
