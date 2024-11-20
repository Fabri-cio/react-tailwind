import { useFetch } from "./useFetch";
import { getAllCategorias } from "../api/producto.api";

export function useCategorias() {
  const { data: categorias, loading, error } = useFetch(getAllCategorias);
  return { categorias, loading, error };
}
