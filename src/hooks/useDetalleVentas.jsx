import { useQuery } from "@tanstack/react-query";
import { DetallesVentaAPI } from "../api/venta.api";

export const useDetalleVentas = () => {
  return useQuery({
    queryKey: ["detalles-venta"], // Llave única para esta consulta
    queryFn: DetallesVentaAPI.getAll, // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Datos frescos durante 5 minutos
    cacheTime: 1000 * 60 * 10, // Mantén los datos en caché durante 10 minutos
  });
};
