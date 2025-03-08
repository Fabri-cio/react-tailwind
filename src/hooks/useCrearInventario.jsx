import { useMutation } from "@tanstack/react-query";
import { InventarioAPI } from "../api/almacen.api";
import { toast } from "react-hot-toast";


export const useCrearInventario = () => {
  return useMutation({
    mutationFn: (nuevoInventario) => InventarioAPI.create(nuevoInventario), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Inventario creado con éxito");
      toast.success("Inventario creado con éxito");
    },
    onError: (error) => {
      console.error("Error al crear el Inventario", error);
      toast.error("Error al crear el Inventario");
    },
  });
};
