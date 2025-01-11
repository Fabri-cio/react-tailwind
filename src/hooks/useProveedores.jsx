import { useFetch } from "./useFetch";
import { getAllProveedores } from "../api/producto.api";

export function useProveedores() {
  const { data: proveedores, loading, error } = useFetch(getAllProveedores);
  return { proveedores, loading, error };
}