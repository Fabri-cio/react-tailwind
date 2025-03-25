import useData from "../hooks/useData";
import { ProductosAPI } from "../api/producto.api";
import { useEntityMutations } from "../hooks/useEntityMutations";

//producto
export const useProduct = (id) => useData(ProductosAPI, "producto", id);

export const useProducts = (all_data = false, page = 1) => {
  return useData( ProductosAPI, "productos", null, { all_data, page }, 1000 * 60 * 5);
};

export const useProductMutations = () => useEntityMutations(ProductosAPI, "Producto");
