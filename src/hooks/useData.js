import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

// Hook genérico para obtener datos
const useData = (api, queryKey, id, params = {}, staleTime) => {
  const { all_data, page } = params;
  return useQuery({
    queryKey: id ? [queryKey, id] : [queryKey, all_data, page],
    queryFn: () => (id ? api(id) : api(all_data, page)),
    ...(id && { enabled: !!id }),
    ...(id ? {} : { staleTime: staleTime || 1000 * 60 * 5 }),
  });
};

// Uso para producto (sin staleTime)
export const useProduct = (id) => useData(ProductosAPI.getOne, "producto", id);

export const useProducts = (all_data = false, page = 1) => {
  return useData(
    ProductosAPI.getAll,
    "productos",
    null,
    { all_data, page },
    1000 * 60 * 5
  ); // 5 minutos de cache
};
