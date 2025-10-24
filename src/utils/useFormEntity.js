import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression"; // 🧠 NUEVO

export const useFormEntity = () => {
  const navigate = useNavigate();

  const options = (entity, keyId, keyNombre) =>
    entity.map((item) => ({
      id: item[keyId],
      nombre: item[keyNombre],
    }));

  const crearEstadoFomulario = (campos) => ({ ...campos });

  const manejarCambioDeEntrada =
    (setFormValues, maxFileSizeMB = 5) =>
    async (e) => {
      const { name, type, files, value } = e.target;

      if (type === "file" && files?.[0]) {
        const file = files[0];

        try {
          if (file.type.startsWith("image/")) {
            // Ajuste dinámico de calidad según tamaño
            const quality = file.size > 3 * 1024 * 1024 ? 0.7 : 0.9; // >3MB → 70%, si no → 90%
            const maxWidthOrHeight = file.size > 3 * 1024 * 1024 ? 1280 : 1920;

            const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight,
              useWebWorker: true,
              initialQuality: quality,
            });

            const newFile = new File(
              [compressedFile],
              `${file.name.split(".")[0]}.webp`,
              { type: "image/webp" }
            );

            setFormValues((prev) => ({ ...prev, [name]: newFile }));
          } else {
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > maxFileSizeMB) {
              console.warn(
                `⚠️ El archivo ${file.name} supera ${maxFileSizeMB}MB`
              );
            }
            setFormValues((prev) => ({ ...prev, [name]: file }));
          }
        } catch (err) {
          console.error("❌ Error al procesar el archivo:", err);
        }
      } else {
        setFormValues((prev) => ({ ...prev, [name]: value }));
      }
    };

  const manejarCambioDeEstado = (setFormValues) => (fieldName) => (value) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const usarEfecto = (entidad, setFormValues, campos = {}) => {
    useEffect(() => {
      if (entidad) {
        setFormValues((prev) => ({ ...prev, ...entidad, ...campos }));
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
    const { onSuccess: callbackExterno, onError: callbackError } = params;

    const filteredData = {};
    Object.entries({ ...formValues, ...params }).forEach(([key, value]) => {
      if (
        value instanceof File ||
        (typeof Blob !== "undefined" && value instanceof Blob)
      ) {
        filteredData[key] = value;
      } else if (
        typeof value === "string" &&
        (value.startsWith("http") || value.startsWith("blob:"))
      ) {
        // omitimos URLs temporales
      } else if (value !== null && value !== undefined) {
        filteredData[key] = value;
      }
    });

    const contieneArchivo = Object.values(filteredData).some(
      (v) =>
        v instanceof File || (typeof Blob !== "undefined" && v instanceof Blob)
    );

    const data = contieneArchivo
      ? Object.entries(filteredData).reduce((formData, [key, val]) => {
          if (val !== null && val !== undefined) formData.append(key, val);
          return formData;
        }, new FormData())
      : filteredData;

    const mutation = entityId ? updateMutation : createMutation;
    mutation.mutate(
      { id: entityId || undefined, data },
      {
        onSuccess: (response) => {
          if (callbackExterno) callbackExterno(response);
          if (response?.link !== undefined) {
            if (response.link === -1) navigate(-1);
            else if (typeof response.link === "string") navigate(response.link);
          } else if (entityName) {
            navigate(entityName);
          }
        },
        onError: (error) => {
          if (callbackError) callbackError(error);
        },
      }
    );
  };

  const destructuring = (hook) => hook() || [];

  const paraSelectsdestructuringYMap = (hook, keyId, keyNombre) => {
    const response = hook({ all_data: true }) || {};
    const lista = Array.isArray(response.data) ? response.data : [];
    return lista.map((item) => ({ id: item[keyId], nombre: item[keyNombre] }));
  };

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

    if (all_data)
      return {
        items: response || [],
        isLoading,
        isError,
        hasPagination: false,
      };

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
    return {
      currentPage: page,
      handlePageChange: () => {},
      isLoading,
      isError,
      items,
      totalItems: total,
      hasPagination: Boolean(next || previous),
      next,
      previous,
      per_page: perPageResponse,
      total_pages,
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
