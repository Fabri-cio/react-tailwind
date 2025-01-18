import axios from "axios";

// Crear instancia base de Axios
const createApiInstance = (baseURL) => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};

// Función genérica para manejar peticiones y errores
const request = async (apiInstance, method, url, data = null) => {
  try {
    const response = await apiInstance.request({ method, url, data });
    console.log("Peticion creada con éxito:", response); 
    return response;
  } catch (error) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error("Sin respuesta del servidor:", error.request);
      throw new Error("El servidor no está respondiendo.");
    } else {
      console.error("Error desconocido:", error.message);
      throw new Error(error.message);
    }
  }
};

export { createApiInstance, request };
