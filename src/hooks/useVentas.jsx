import { useFetch } from "./useFetch";
import { getAllVentas } from "../api/venta.api";

export function useVentas() {
  const { data: ventas, loading, error } = useFetch(getAllVentas);
  return { ventas, loading, error };
}
