import { useQuery } from "@tanstack/react-query";
import { AlmaceneAPI } from "../api/almacen.api";

export const useAlmacenTiendas = () => {
  return useQuery({
    queryKey: ["almacenes"],
    queryFn: AlmaceneAPI.getAll,
  });
};
