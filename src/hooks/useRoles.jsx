import { useFetch } from "./useFetch";
import { getAllRoles } from "../api/usuario.api";

export function useRoles() {
  const { data: roles, loading, error } = useFetch(getAllRoles);
  return { roles, loading, error };
}
