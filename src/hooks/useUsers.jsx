import { useQuery } from "@tanstack/react-query";
import { CustomUsersAPI } from "../api/usuario.api";

export default function useUsers(all_data = false, page = 1) {
  return useQuery({
    queryKey: ["usuarios", all_data, page], // Añadimos `all_data` a la queryKey para que sea único
    queryFn: () => CustomUsersAPI.getAll(all_data, page), // Pasamos `all_data` a la función getAll
    staleTime: 1000 * 60 * 5, // Cachea por 5 minutos para mejorar rendimiento
  });
}
