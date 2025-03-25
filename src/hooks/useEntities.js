import useData from "../hooks/useData";
import { ProductosAPI } from "../api/producto.api";
import { useEntityMutations } from "../hooks/useEntityMutations";
import { CustomUsersAPI } from "../api/usuario.api";

//producto
export const useProduct = (id) => useData(ProductosAPI, "producto", id);

export const useProducts = (all_data = false, page = 1) => {
  return useData( ProductosAPI, "productos", null, { all_data, page }, 1000 * 60 * 5);
};

export const useProductMutations = () => useEntityMutations(ProductosAPI, "Producto");

//users
export const useUser = (id) => useData(CustomUsersAPI, "user", id);

export const useUsers = (all_data = false, page = 1) => {
  return useData( CustomUsersAPI, "users", null, { all_data, page }, 1000 * 60 * 5);
};

export const useUserMutations = () => useEntityMutations(CustomUsersAPI, "Usuario");
