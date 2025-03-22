import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

// Hook para obtener un solo producto
export const useProduct = (id) => {
  return useQuery({
    queryKey: ["producto", id],
    queryFn: () => ProductosAPI.getOne(id),
    enabled: !!id, // Solo ejecuta la consulta si el ID es válido
  });
};
