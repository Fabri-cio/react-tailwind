import { useQuery } from "@tanstack/react-query";
import { MovimientoAPI } from "../api/almacen.api";

export const useMovimientos = () => {
  return useQuery({
    queryKey: ["movimientos"], // Llave única para esta consulta
    queryFn: MovimientoAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};