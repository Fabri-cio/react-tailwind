import { useMutation } from "@tanstack/react-query";
import { PasswordResetAPI } from "../api/usuario.api"; // Asegúrate de que la ruta sea correcta

export const usePasswordResetRequest = () => {
  return useMutation({
    mutationFn: (email) => PasswordResetAPI.requestReset(email),
    onSuccess: () => {
      console.log("Solicitud de restablecimiento de contraseña enviada");
    },
    onError: (error) => {
      console.error("Error al solicitar el restablecimiento de contraseña", error);
    },
    onSettled: () => {
      // Esto se ejecuta tanto si la mutación es exitosa como si falla
      console.log("La mutación de restablecimiento de contraseña se ha completado.");
    }
  });
};
