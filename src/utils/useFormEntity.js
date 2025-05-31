import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "./usePagination";

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
      estadoInicial[campo] = campos[campo]; // Usa el valor original esto arregla el togle de estado F V
    });
    return estadoInicial;
  };

  const manejarCambioDeEntrada = (setFormValues) => (e) => {
    const { name, type, files, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const manejarCambioDeEstado = (setFormValues) => (fieldName) => (value) => {
    setFormValues((prevState) => ({ ...prevState, [fieldName]: value }));
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
    }, [entidad?.data, setFormValues]);
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
    // Combinar formValues con params
    const dataToSend = {
      ...formValues,
      ...params,
    };

    // Filtrar los campos que no deben incluirse en el envío
    const filteredData = {};
    Object.entries(dataToSend).forEach(([key, value]) => {
      // Si el valor es un archivo (File o Blob), lo incluimos
      if (value instanceof File || (typeof Blob !== "undefined" && value instanceof Blob)) {
        filteredData[key] = value;
      }
      // Si el valor es una cadena que parece una URL, la omitimos (es un archivo existente)
      else if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('blob:'))) {
        // No incluimos las URLs de archivos existentes
      }
      // Para cualquier otro valor que no sea nulo ni indefinido, lo incluimos
      else if (value !== null && value !== undefined) {
        filteredData[key] = value;
      }
    });

    // Verificar si hay archivos para enviar
    const contieneArchivo = Object.values(filteredData).some(
      (value) => value instanceof File || (typeof Blob !== "undefined" && value instanceof Blob)
    );

    let data;
    if (contieneArchivo) {
      // Si hay archivos, usa FormData
      data = new FormData();
      Object.entries(filteredData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });
    } else {
      // Si no hay archivos, usa objeto plano
      data = filteredData;
    }

    const mutation = entityId ? updateMutation : createMutation;
    mutation.mutate(
      { id: entityId || undefined, data },
      { 
        onSuccess: (response) => {
          // Si la respuesta incluye un link, usarlo para navegación
          if (response?.data?.link !== undefined) {
            if (response.data.link === -1) {
              navigate(-1); // Navegar hacia atrás
            } else if (typeof response.data.link === 'string') {
              navigate(response.data.link); // Navegar a ruta específica
            }
          } else if (entityName) {
            // Comportamiento por defecto si no hay link en la respuesta
            navigate(entityName);
          }
        }
      }
    );
  };

  const destructuring = (hook) => {
    const { data = {} } = hook() || {};
    return data.data || [];
  };

  const paraSelectsdestructuringYMap = (hook, all_data, keyId, keyNombre) => {
    const { data: response = {} } = hook(all_data);
    return (response.data || []).map((item) => ({
      id: item[keyId], // Accede dinámicamente a la clave id
      nombre: item[keyNombre], // Accede dinámicamente a la clave nombre
    }));
  };

  const todosDatosOpaginacion = (fetchDataHook, all_data) => {
    const { currentPage, handlePageChange } = usePagination();

    const {
      data: response = {},
      isLoading,
      isError,
    } = fetchDataHook(all_data, currentPage);

    const {
      count = 0,
      next = null,
      previous = null,
      results,
    } = response.data || {};

    const items = results || response.data || [];

    const totalItems = count;

    const hasPagination = next || previous;

    return {
      currentPage,
      handlePageChange,
      isLoading,
      isError,
      items,
      totalItems,
      hasPagination,
      next,
      previous,
    };
  };

  return {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    usarEfecto,
    manejarEnvio,
    destructuring,
    paraSelectsdestructuringYMap,
    todosDatosOpaginacion,
  };
};
