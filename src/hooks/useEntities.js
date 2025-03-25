import useData from "../hooks/useData";
import { ProductosAPI, CategoriasAPI, ProveedoresAPI } from "../api/producto.api";
import { useEntityMutations } from "../hooks/useEntityMutations";
import { CustomUsersAPI } from "../api/usuario.api";

//productos
export const useProduct = (id) => useData(ProductosAPI, "producto", id);
export const useProducts = (all_data = false, page = 1) => {
  return useData( ProductosAPI, "productos", null, { all_data, page }, 1000 * 60 * 5);
};
export const useProductMutations = () => useEntityMutations(ProductosAPI, "Producto");

//categorias
export const useCategoria = (id) => useData(CategoriasAPI, "categoria", id);
export const useCategorias = (all_data = false, page = 1) => {
  return useData( CategoriasAPI, "categorias", null, { all_data, page }, 1000 * 60 * 5);
};
export const useCategoriaMutations = () => useEntityMutations(CategoriasAPI, "Categoria");

//proveedores
export const useProveedor = (id) => useData(ProveedoresAPI, "proveedor", id);
export const useProveedores = (all_data = false, page = 1) => {
  return useData( ProveedoresAPI, "proveedores", null, { all_data, page }, 1000 * 60 * 5);
};
export const useProveedorMutations = () => useEntityMutations(ProveedoresAPI, "Proveedor");

//users
export const useUser = (id) => useData(CustomUsersAPI, "user", id);

export const useUsers = (all_data = false, page = 1) => {
  return useData( CustomUsersAPI, "users", null, { all_data, page }, 1000 * 60 * 5);
};

export const useUserMutations = () => useEntityMutations(CustomUsersAPI, "Usuario");
