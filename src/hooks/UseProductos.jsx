import { useFetch } from "./useFetch";
import { getAllProductos } from "../api/producto.api";

export function useProductos() {
  const { data: productos, loading, error } = useFetch(getAllProductos);
  return { productos, loading, error };
}
