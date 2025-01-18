// import { useFetch } from "./useFetch";
// import { getAllProductos } from "../api/producto.api";

// export function useProductos() {
//   const { data: productos, loading, error } = useFetch(getAllProductos);
//   return { productos, loading, error };
// }

import { useQuery } from "@tanstack/react-query";
import { ProductosAPI } from "../api/producto.api";

export const useProductos = () => {
  return useQuery({
    queryKey: ["productos"], // Llave única para esta consulta
    queryFn: ProductosAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};
