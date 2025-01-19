// hooks/useVentas.js

import { useQuery } from "@tanstack/react-query";
import { VentasAPI } from "../api/venta.api";

export const useVentas = () => {
  return useQuery({
    queryKey: ["ventas"], // Llave única para esta consulta
    queryFn: VentasAPI.getAll, // Función que devuelve los datos de ventas
  });
};
