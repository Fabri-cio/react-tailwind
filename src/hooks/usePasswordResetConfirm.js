import { useMutation } from "@tanstack/react-query";
import { PasswordResetAPI } from "../api/usuario.api"; // Asegúrate de que la ruta sea correcta

export const usePasswordResetConfirm = () => {
  return useMutation({
    mutationFn: ({ token, password }) => PasswordResetAPI.confirmReset(token, password),
    onSuccess: () => {
      console.log("Contraseña restablecida con éxito");
    },
    onError: (error) => {
      console.error("Error al restablecer la contraseña", error);
    },
  });
};