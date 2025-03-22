import { UsuariosAPI } from "../api/usuario.api";
import { useMutationWithToast } from "./useMutationWithToast";


export const useUserMutations = () => {
  const crearUsuario = useMutationWithToast(
    UsuariosAPI.create,
    "Creando Usuario...",
    "Usuario creado con éxito 🎉",
    "usuarios" // Invalida la query de productos
  );

  const actualizarUsuario = useMutationWithToast(
    ({ id, data }) => UsuariosAPI.update(id, data),
    "Actualizando usuario...",
    "Usuario actualizado con éxito ✅",
    "usuarios"
  );

  return { crearUsuario, actualizarUsuario };
};
