import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "./usePagination";

export const useFormEntity = () => {
  const navigate = useNavigate();

  const options = (entity, keyId, keyNombre) =>
    entity.map((item) => ({
      id: item[keyId],
      nombre: item[keyNombre],
    }));

  const crearEstadoFomulario = (campos) => {
    const estadoInicial = {};
    Object.keys(campos).forEach((campo) => {
      estadoInicial[campo] = campos[campo];
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
      if (entidad) {
        setFormValues((prevState) => ({
          ...prevState,
          ...entidad,
          ...campos,
        }));
      }
    }, [entidad, setFormValues]);
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
    const dataToSend = {
      ...formValues,
      ...params,
    };

    const filteredData = {};
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (
        value instanceof File ||
        (typeof Blob !== "undefined" && value instanceof Blob)
      ) {
        filteredData[key] = value;
      } else if (
        typeof value === "string" &&
        (value.startsWith("http") || value.startsWith("blob:"))
      ) {
        // omitimos
      } else if (value !== null && value !== undefined) {
        filteredData[key] = value;
      }
    });

    let data;
    const contieneArchivo = Object.values(filteredData).some(
      (value) =>
        value instanceof File ||
        (typeof Blob !== "undefined" && value instanceof Blob)
    );

    if (contieneArchivo) {
      data = new FormData();
      Object.entries(filteredData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });
    } else {
      data = filteredData;
    }

    const mutation = entityId ? updateMutation : createMutation;
    mutation.mutate(
      { id: entityId || undefined, data },
      {
        onSuccess: (response) => {
          if (response?.link !== undefined) {
            if (response.link === -1) {
              navigate(-1);
            } else if (typeof response.link === "string") {
              navigate(response.link);
            }
          } else if (entityName) {
            navigate(entityName);
          }
        },
      }
    );
  };

  const destructuring = (hook) => {
    const data = hook() || {};
    return data || [];
  };

  const paraSelectsdestructuringYMap = (hook, keyId, keyNombre) => {
    const response = hook({ all_data: true }) || {};
    const lista = Array.isArray(response.data) ? response.data : [];
    return lista.map((item) => ({
      id: item[keyId],
      nombre: item[keyNombre],
    }));
  };

  // Solo el cambio de la función que ya tienes dentro de useFormEntity.js

  const todosDatosOpaginacion = (fetchDataHook, params = {}) => {
    const {
      all_data = false,
      page = 1,
      per_page = 10,
      search = "",
      filters = {},
      ordering = "",
    } = params;

    const pageToUse = all_data ? 1 : page;

    const {
      data: response = {},
      isLoading,
      isError,
    } = fetchDataHook({
      all_data,
      page: pageToUse,
      per_page,
      search,
      filters,
      ordering,
    }) || {};

    if (all_data) {
      const items = response || [];
      return { items, isLoading, isError, hasPagination: false };
    } else {
      const {
        total_pages,
        per_page: perPageResponse,
        total,
        next = null,
        previous = null,
        results,
        ...rest
      } = response || {};

      const items = results || rest || [];
      const totalItems = total;
      const hasPagination = Boolean(next || previous);

      return {
        currentPage: page,
        handlePageChange: () => {}, // Será manejado externamente
        isLoading,
        isError,
        items,
        totalItems,
        hasPagination,
        next,
        previous,
        per_page: perPageResponse,
        total_pages,
      };
    }
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
