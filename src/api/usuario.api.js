import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de usuarios
const ApiUsuarios = createApiInstance("http://localhost:8000/api/v1/usuarios/");

// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: () => request(apiInstance, "get", `${resource}/`),
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});

// Funciones específicas para el login y registro
export const login = (email, password) => request(ApiUsuarios, "post", "login/", { email, password });
export const register = (data) => request(ApiUsuarios, "post", "register/", data);

// Crear operaciones CRUD específicas para los usuarios
export const UsuariosAPI = createCrudOperations(ApiUsuarios, "usuarios");
export const CustomUserAPI = createCrudOperations(ApiUsuarios, "customuser");
export const RolApi = createApiInstance(ApiUsuarios, "role")
