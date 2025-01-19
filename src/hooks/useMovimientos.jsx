import { useQuery } from "@tanstack/react-query";
import { MovimientoAPI } from "../api/almacen.api";

export const useMovimientos = () => {
  return useQuery({
    queryKey: ["movimientos"], // Llave única para esta consulta
    queryFn: MovimientoAPI.getAll, // Función que devuelve los datos
  });
};