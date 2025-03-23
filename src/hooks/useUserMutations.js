import { CustomUsersAPI } from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";


export const useUserMutations = () => {
  const crearUsuario = useMutationWithToast(
    CustomUsersAPI.create,
    "Creando Usuario...",
    "Usuario creado con éxito 🎉",
    "usuarios" // Invalida la query de productos
  );

  const actualizarUsuario = useMutationWithToast(
    ({ id, data }) => CustomUsersAPI.update(id, data),
    "Actualizando usuario...",
    "Usuario actualizado con éxito ✅",
    "usuarios"
  );

  return { crearUsuario, actualizarUsuario };
};
