import { useQuery } from "@tanstack/react-query";
import { ProveedoresAPI } from "../api/producto.api";

export const useProveedores = () => {
  return useQuery({
    queryKey: ["proveedores"], // Llave única para esta consulta
    queryFn: ProveedoresAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};
