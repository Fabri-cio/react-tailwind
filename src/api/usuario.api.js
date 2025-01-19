import { createApiInstance, request } from "./api.Base";
import axios from 'axios'; // Asegúrate de importar axios

// Crear instancia específica para la ApiUsuarios de usuarios
const ApiUsuarios = createApiInstance("http://localhost:8000/api/v1/usuarios/");

// Funciones específicas para cada endpoint
export const login = (email, password) => request(ApiUsuarios, "post", "login/", { email, password });
export const register = (data) => request(ApiUsuarios, "post", "register/", data);
export const fetchUsers = () => request(ApiUsuarios, "get", "usuarios/"); 
export const createUser = (data) => request(ApiUsuarios, "post", "usuarios/", data);
export const updateUser = (id, data) => request(ApiUsuarios, "put", `usuarios/${id}/`, data);
export const deleteUser = (id) => request(ApiUsuarios, "delete", `usuarios/${id}/`);


