import { useMutation } from "@tanstack/react-query";
import { RegistroApi } from "../api/usuario.api";

export const useRegistrarUsuario = () => {
  return useMutation({
    mutationFn: (nuevoUsuario) => RegistroApi.create(nuevoUsuario), // Llama a la función 'create' del API
    onSuccess: () => {
      console.log("Usuario creado con éxito");
    },
    onError: (error) => {
      console.error("Error al crear el Usuario", error);
    },
  });
};
