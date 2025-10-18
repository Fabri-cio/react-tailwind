import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiProductos = createApi("productos");

export const ProductosAPI = createCrudOperations(ApiProductos, "productos");
export const CategoriasAPI = createCrudOperations(ApiProductos, "categorias");
export const ProveedoresAPI = createCrudOperations(ApiProductos, "proveedores");
export const ProductosPorCategoriaAPI = createCrudOperations(ApiProductos, "productos_por_categoria");
export const ProductosPorProveedorAPI = createCrudOperations(ApiProductos, "productos_por_proveedor");
export const CategoriasListAPI = createCrudOperations(ApiProductos, "categorias-list");
export const ProveedoresListAPI = createCrudOperations(ApiProductos, "proveedores-list");
