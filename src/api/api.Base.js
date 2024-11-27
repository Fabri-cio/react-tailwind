import axios from "axios";

// Función para crear una instancia base de Axios
const createApiInstance = (baseURL) => {
  return axios.create({ baseURL });
};

// Función genérica para manejar peticiones y errores
const request = async (apiInstance, method, url, data = null) => {
  try {
    const response = await apiInstance.request({ method, url, data });
    return response;
  } catch (error) {
    console.error(`Error en ${method.toUpperCase()} ${url}:`, error);
    throw error;
  }
};

export { createApiInstance, request };
