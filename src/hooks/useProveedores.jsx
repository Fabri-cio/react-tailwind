import { useQuery } from "@tanstack/react-query";
import { ProveedoresAPI } from "../api/producto.api";

export const useProveedores = () => {
  return useQuery({
    queryKey: ["proveedores"], // Llave única para esta consulta
    queryFn: ProveedoresAPI.getAll, // Función que devuelve los datos
  });
};
