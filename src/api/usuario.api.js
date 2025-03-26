import { createApi } from "./api.config";
import { createCrudOperations} from "./api.crud";
import { createApiInstance, request} from "./api.Base";

const ApiUsers = createApi("usuarios");

// Crear operaciones CRUD específicas para los usuarios
export const UsuariosAPI = createCrudOperations(ApiUsers, "usuarios");
export const CustomUsersAPI = createCrudOperations(ApiUsers, "customuser");
export const RolesApi = createCrudOperations(ApiUsers, "role");

// Funciones específicas para el login y registro
export const login = (email, password) => request(ApiUsers, "post", "login/", { email, password });
export const RegistroApi = createCrudOperations(ApiUsers, "register");
export const logoutAll = () => request(ApiUsers, "post", "logoutall/");

// 🔹 API de restablecimiento de contraseña (Corrección de rutas)
const PasswordResetBaseURL = createApiInstance("http://localhost:8000/api/password_reset/");

export const PasswordResetAPI = {
  requestReset: (email) => request(PasswordResetBaseURL, "post", "", { email }),  // ← Ruta corregida
  confirmReset: (token, password) => request(PasswordResetBaseURL, "post", "confirm/", { token, password }),
};
