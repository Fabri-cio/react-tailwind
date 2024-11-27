import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de usuarios
const ApiUsuarios = createApiInstance("http://localhost:8000/api/v1/usuarios/");

// Usuarios
export const getAllUsuarios = () => request(ApiUsuarios, "get", "usuarios/");
export const getUsuario = (id) => request(ApiUsuarios, "get", `usuarios/${id}`);
export const createUsuario = (usuario) => request(ApiUsuarios, "post", "usuarios/", usuario);
export const updateUsuario = (id, usuario) => request(ApiUsuarios, "put", `usuarios/${id}/`, usuario);
export const deleteUsuario = (id) => request(ApiUsuarios, "delete", `usuarios/${id}/`);

// Roles
export const getAllRoles = () => request(ApiUsuarios, "get", "roles/");
export const getRole = (id) => request(ApiUsuarios, "get", `roles/${id}`);
export const createRole = (role) => request(ApiUsuarios, "post", "roles/", role);
export const updateRole = (id, role) => request(ApiUsuarios, "put", `roles/${id}/`, role);
export const deleteRole = (id) => request(ApiUsuarios, "delete", `roles/${id}/`);

//RolesUsuario
export const getAllUserRoles = () => request(ApiUsuarios, "get", "rolesUsuario/");
export const getUserRole = (id) => request(ApiUsuarios, "get", `rolesUsuario/${id}`);
export const createUserRole = (role) => request(ApiUsuarios, "post", "rolesUsuario/", role);
export const updateUserRole = (id, role) => request(ApiUsuarios, "put", `rolesUsuario/${id}/`, role);
export const deleteUserRole = (id) => request(ApiUsuarios, "delete", `rolesUsuario/${id}/`);
