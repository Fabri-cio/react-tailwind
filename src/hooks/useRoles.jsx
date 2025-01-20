import { useQuery } from "@tanstack/react-query";
import { RolApi } from "../api/usuario.api";

export const useRoles = () => {
  return useQuery({
    queryKey: ["role"], // Llave única para esta consulta
    queryFn: RolApi.getAll // Función que devuelve los datos
  });
};
