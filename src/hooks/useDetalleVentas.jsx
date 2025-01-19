import { useQuery } from "@tanstack/react-query";
import { DetallesVentaAPI } from "../api/venta.api";

export const useDetalleVentas = () => {
  return useQuery({
    queryKey: ["detalles-venta"], // Llave única para esta consulta
    queryFn: DetallesVentaAPI.getAll, // Función que devuelve los datos
  });
};
