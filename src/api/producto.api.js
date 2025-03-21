import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiProductos = createApi("productos");

export const ProductosAPI = createCrudOperations(ApiProductos, "productos");
export const CategoriasAPI = createCrudOperations(ApiProductos, "categorias");
export const ProveedoresAPI = createCrudOperations(ApiProductos, "proveedores");
