import { createApi } from "./api.config";
import { createCrudOperations} from "./api.crud";
import { createApiInstance, request} from "./api.Base";

const ApiUsers = createApi("usuarios");
const ApiBaseURL = import.meta.env.VITE_API_BASE_URL;

// Crear operaciones CRUD específicas para los usuarios
export const UsuariosAPI = createCrudOperations(ApiUsers, "usuarios");
export const RolesApi = createCrudOperations(ApiUsers, "grupos");
export const PermisosApi = createCrudOperations(ApiUsers, "permisos");
export const UsuariosListApi = createCrudOperations(ApiUsers, "usuarios-list");
export const RolSelectDualApi = createCrudOperations(ApiUsers, "rol-select-dual");
export const RolListApi = createCrudOperations(ApiUsers, "roles-list");

// Funciones específicas para el login y registro
export const login = (email, password) => request(ApiUsers, "post", "login/", { email, password });
export const RegistroApi = createCrudOperations(ApiUsers, "register");
export const logoutAll = () => request(ApiUsers, "post", "logoutall/");

// 🔹 API de restablecimiento de contraseña (Corrección de rutas)
const PasswordResetBaseURL = createApiInstance(`${ApiBaseURL}/password_reset/`);

export const PasswordResetAPI = {
  requestReset: (email) => request(PasswordResetBaseURL, "post", "", { email }),  // ← Ruta corregida
  confirmReset: (token, password) => request(PasswordResetBaseURL, "post", "confirm/", { token, password }),
};
