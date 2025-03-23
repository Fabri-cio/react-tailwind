import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import createApiInstance from './api.Base2';

const apiInstance = createApiInstance();

// Función genérica para hacer peticiones con Axios
const request = async (method, url, data = null) => {
  const response = await apiInstance.request({ method, url, data });
  return response.data; // Devuelve solo los datos de la respuesta
};

// Funciones CRUD genéricas usando React Query
const useCrudOperations = (resource) => {
  const queryClient = useQueryClient();

  // Función para obtener todos los elementos (con paginación)
  const getAll = (page = 1, all_data = false) => {
    return useQuery({
      queryKey: [resource, { page, all_data }],
      queryFn: () => {
        let url = `${resource}/?page=${page}`;
        if (all_data) url += "&all_data=true";
        return request('get', url);
      },
      staleTime: 1000 * 60 * 5, // Cachea por 5 minutos
      refetchInterval: 1000 * 60 * 2, // Actualiza cada 2 minutos
    });
  };

  // Función para obtener un solo elemento
  const getOne = (id) => {
    return useQuery({
      queryKey: [resource, id],
      queryFn: () => request('get', `${resource}/${id}`),
      enabled: !!id, // Solo se ejecuta si `id` es válido
    });
  };

  // Función para crear un nuevo elemento
  const create = () => {
    return useMutation({
      mutationFn: (data) => request('post', `${resource}/`, data),
      onSuccess: () => {
        queryClient.invalidateQueries([resource]); // Invalida la caché de todos los recursos
      },
      onError: (error) => {
        console.error("Error al crear", error);
      },
    });
  };

  // Función para actualizar un elemento
  const update = (id) => {
    return useMutation({
      mutationFn: (data) => request('put', `${resource}/${id}/`, data),
      onSuccess: () => {
        queryClient.invalidateQueries([resource, id]); // Invalida la caché del recurso y el producto específico
      },
      onError: (error) => {
        console.error("Error al actualizar", error);
      },
    });
  };

  // Función para eliminar un elemento
  const remove = (id) => {
    return useMutation({
      mutationFn: () => request('delete', `${resource}/${id}/`),
      onSuccess: () => {
        queryClient.invalidateQueries([resource]); // Invalida la caché de todos los recursos
      },
      onError: (error) => {
        console.error("Error al eliminar", error);
      },
    });
  };

  return { getAll, getOne, create, update, remove };
};

export default useCrudOperations;
