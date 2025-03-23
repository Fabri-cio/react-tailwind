import axios from "axios";

const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear instancia base de Axios
const createApiInstance = (baseURL = ApiBaseURL) => {
  const apiInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
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
      console.log( "Token agregado a la solicitud:", config.headers.Authorization);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta: maneja errores globales
  apiInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("Token"); // Eliminar token si la respuesta es 401
        console.error("Sesión expirada, redirigiendo al login.");
      }
      return Promise.reject(error); // Devuelve el error para que se pueda manejar en otro lugar
    }
  );

  return apiInstance;
};

export default createApiInstance;

