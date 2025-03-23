import { useQuery } from "@tanstack/react-query";
import { CustomUsersAPI } from "../api/usuario.api";

export const useUser = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => CustomUsersAPI.getOne(id),
    enabled: !!id, // Solo ejecuta la consulta si el ID es válido
  });
};
