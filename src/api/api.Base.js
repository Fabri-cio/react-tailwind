import axios from "axios";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia base de Axios
const createApiInstance = (baseURL = ApiBaseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      accept: "application/json",
    },
  });

  // Interceptor de solicitud: agrega el token de autorización
  apiInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token");
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      console.log(
        "Token agregado a la solicitud:",
        config.headers.Authorization
      );
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor de respuesta: maneja errores globales
  apiInstance.interceptors.response.use(
    (response) => {
      console.log("Respuesta exitosa:", response);
      return response.data; // Devuelve sólo los datos
    },
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("Token"); // Eliminar token si la sesión expiró
        console.error("Sesión expirada, redirigiendo al login.");
        // Aquí puedes lanzar un evento para que otros componentes lo detecten si quieres
        window.dispatchEvent(new Event("session-expired"));
      } else if (error.response) {
        console.error("Error del servidor:", error.response.data);
      } else if (error.request) {
        console.error("Sin respuesta del servidor:", error.request);
      } else {
        console.error("Error desconocido:", error.message);
      }
      return Promise.reject(error); // Mantener el error completo
    }
  );

  return apiInstance;
};

// Función genérica para manejar peticiones y errores
const request = async (apiInstance, method, url, data = null) => {
  try {
    const response = await apiInstance.request({ method, url, data });
    console.log("Petición exitosa:", response);
    return response; // 👈 ya es el .data gracias al interceptor
  } catch (error) {
    throw error; // 🔥 Mantenemos el error completo
  }
};

export { createApiInstance, request };
