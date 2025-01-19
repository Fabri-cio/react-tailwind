import { useQuery } from "@tanstack/react-query";
import { VentasAPI } from "../api/venta.api";

export const useVenta = (id) => {
  return useQuery({
    queryKey: ["venta", id], // Llave única basada en el id
    queryFn: () => VentasAPI.getOne(id), // Llamada a la API para obtener una venta específica
    enabled: !!id, // Solo ejecuta la consulta si el id está definido
  });
};
