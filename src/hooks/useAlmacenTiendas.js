import { useQuery } from "@tanstack/react-query";
import { AlmaceneAPI } from "../api/almacen.api";

export default function useAlmacenTiendas(all_data = false, page = 1) {
  return useQuery({
    queryKey: ["almacenes", all_data, page],
    queryFn: () => AlmaceneAPI.getAll(all_data, page),
    staleTime: 1000 * 60 * 5,
  });
}
