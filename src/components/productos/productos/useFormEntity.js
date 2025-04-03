import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useFormEntity = () => {
  const navigate = useNavigate();

  const options = (entity, keyId, keyNombre) =>
    entity.map((item) => ({
      id: item[keyId], // Accede dinámicamente a la clave id
      nombre: item[keyNombre], // Accede dinámicamente a la clave nombre
    }));

  const crearEstadoFomulario = (campos) => {
    const estadoInicial = {};
    Object.keys(campos).forEach((campo) => {
      estadoInicial[campo] = "";
    });
    return estadoInicial;
  };

  const manejarCambioDeEntrada = (setFormValues) => (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const manejarCambioDeEstado = (setFormValues) => (value) => {
    setFormValues((prevState) => ({ ...prevState, estado: value }));
  };

  const usarEfecto = (entidad, setFormValues, campos = {}) => {
    useEffect(() => {
      if (entidad?.data) {
        setFormValues((prevState) => ({
          ...prevState,
          ...entidad.data,
          ...campos,
        }));
      }
    }, [entidad]);
  };

  const manejarEnvio = (
    event,
    entityName,
    formValues,
    createMutation,
    updateMutation,
    entityId,
    params = {}
  ) => {
    event.preventDefault();

    const dataToSend = {
      ...formValues,
      ...params,
    };

    const mutation = entityId ? updateMutation : createMutation;
    mutation.mutate(
      { id: entityId || undefined, data: dataToSend },
      { onSuccess: () => navigate(`/${entityName}`) }
    );
  };

  const destructuring = (hook) => {
    const { data = {} } = hook() || {};
    return data.data || [];
  };
  
  return {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    usarEfecto,
    manejarEnvio,
    destructuring
  };
};
