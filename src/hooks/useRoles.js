import { useQuery } from "@tanstack/react-query";
import { RolApi } from "../api/usuario.api";

export default function useRoles(all_data = false, page = 1) {
  return useQuery({
    queryKey: ["role", all_data, page], // Llave única para esta consulta
    queryFn: () => RolApi.getAll(all_data, page), // Función que devuelve los datos
    staleTime: 1000 * 60 * 5, // Cachea por 5 minutos para mejorar rendimiento
  });
}
