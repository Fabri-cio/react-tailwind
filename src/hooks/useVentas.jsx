// hooks/useVentas.js

import { useQuery } from "@tanstack/react-query";
import { VentasAPI } from "../api/venta.api";

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"], // Llave única para esta consulta
    queryFn: VentasAPI.getAll, // Función que devuelve los datos de ventas
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};
