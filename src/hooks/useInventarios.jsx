import { useQuery } from "@tanstack/react-query";
import { InventarioAPI } from "../api/almacen.api";

export const useInventarios = () => {
  return useQuery({
    queryKey: ["inventarios"], // Llave única para esta consulta
    queryFn: InventarioAPI.getAll, // Función que devuelve los datos
    onSuccess: (data) => {
      console.log("Inventarios cargados:", data);
    },
    onError: (error) => {
      console.error("Error al cargar inventarios:", error);
    },
  });
};
