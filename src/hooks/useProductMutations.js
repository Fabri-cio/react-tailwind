import { ProductosAPI } from "../api/producto.api";
import { useMutationWithToast } from "./useMutationWithToast";

export const useProductMutations = () => {
  const crearProducto = useMutationWithToast(
    ({data}) => ProductosAPI.create(data),
    "Creando producto...",
    "Producto creado con éxito 🌫😜",
    "productos" // Invalida la query de productos
  );

  const actualizarProducto = useMutationWithToast(
    ({ id, data }) => ProductosAPI.update(id, data),
    "Actualizando producto...",
    "Producto actualizado con éxito ✅",
    "productos"
  );

  return { crearProducto, actualizarProducto };
};
