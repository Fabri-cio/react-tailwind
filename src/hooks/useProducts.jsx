import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export default function useProducts(all_data = false, page = 1) {
  return useQuery({
    queryKey: ["productos", all_data, page], // Añadimos `all_data` a la queryKey para que sea único
    queryFn: () => ProductosAPI.getAll(all_data, page), // Pasamos `all_data` a la función getAll
    staleTime: 1000 * 60 * 5, // Cachea por 5 minutos para mejorar rendimiento
  });
}
