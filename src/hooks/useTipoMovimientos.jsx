import { useQuery } from "@tanstack/react-query";
import { TiposMovimientoAPI } from "../api/almacen.api";


export const useTipoMovimientos = () => {
  return useQuery({
    queryKey: ["tipos-movimiento"], // Llave única para esta consulta
    queryFn: TiposMovimientoAPI.getAll, // Función que devuelve los datos
  });
};
