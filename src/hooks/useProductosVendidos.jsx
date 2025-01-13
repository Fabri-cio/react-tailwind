import { useFetch } from "./useFetch";
import { getAllVentaDetalle } from "../api/venta.api";

export function useProductosVendidos() {
  const { data: productosVendidos, loading, error } = useFetch(getAllVentaDetalle);
  return { productosVendidos, loading, error };
}
