import { useFetch } from "./useFetch";
import { getAllUserRoles } from "../api/usuario.api";

export function useUserRoles() {
  const { data: userRoles, loading, error } = useFetch(getAllUserRoles);
  return { userRoles, loading, error };
}
