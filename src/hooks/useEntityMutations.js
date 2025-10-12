import { useMutationWithToast } from "../hooks/useMutationWithToast";

export const useEntityMutations = (api, entityName) => {
  const crearMutacion = (action, actionName) =>
    useMutationWithToast(
      action,
      `${actionName} ${entityName}...`,
      `${entityName} ${actionName.toLowerCase()} con éxito 🎉`,
      entityName.toLowerCase()
    );

  return {
    crear: crearMutacion(({ data }) => api.create(data), "Creando"),
    actualizar: crearMutacion(({ id, data }) => api.update(id, data), "Actualizando"),
    eleminar: crearMutacion(({id}) => api.delete(id), "Eliminando")
  };
};
