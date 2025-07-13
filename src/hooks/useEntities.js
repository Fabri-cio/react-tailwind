import useData from "./useData";
import { useEntityMutations } from "./useEntityMutations";
import {
  ProductosAPI,
  CategoriasAPI,
  ProveedoresAPI,
} from "../api/producto.api";
import { CustomUsersAPI, RolesApi, PasswordResetAPI } from "../api/usuario.api";
import {
  InventariosAPI,
  TipMovsApi,
  AlmacenesApi,
  MovimientosAPI,
} from "../api/almacen.api";
import { VentasAPI, DetVentasAPI } from "../api/venta.api";
import { useMutationWithToast } from "./useMutationWithToast";

export const useProductByBarcode = (codigo_barras) => {
  return useData(
    ProductosAPI,
    "productos",
    null,
    {
      filters: {
        codigo_barras,
      },
    },
    1000 * 60 * 5
  );
};

// 🔍 Hook para búsqueda general por término (nombre, proveedor, categoría, código de barras)
export const useSearchProducts = (term) => {
  return useData(
    ProductosAPI,
    "productos",
    null,
    term,
    1000 * 60 * 5
  );
};


//productos
export const useProducts = (all_data = false, page = 1, per_page = 10) => {
  return useData(
    ProductosAPI,
    "productos",
    null,
    { all_data, page, per_page },
    1000 * 60 * 5
  );
};
export const useProduct = (id) => useData(ProductosAPI, "producto", id);
export const useProductMutations = () =>
  useEntityMutations(ProductosAPI, "Producto");

//categorias
export const useCategorias = (all_data = false, page = 1) => {
  return useData(
    CategoriasAPI,
    "categorias",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useCategoria = (id) => useData(CategoriasAPI, "categoria", id);
export const useCategoriaMutations = () =>
  useEntityMutations(CategoriasAPI, "Categoria");

//proveedores
export const useProveedores = (all_data = false, page = 1) => {
  return useData(
    ProveedoresAPI,
    "proveedores",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useProveedor = (id) => useData(ProveedoresAPI, "proveedor", id);
export const useProveedorMutations = () =>
  useEntityMutations(ProveedoresAPI, "Proveedor");

//users
export const useUsers = (all_data = false, page = 1) => {
  return useData(
    CustomUsersAPI,
    "users",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useUser = (id) => useData(CustomUsersAPI, "user", id);
export const useUserMutations = () =>
  useEntityMutations(CustomUsersAPI, "Usuario");

//roles
export const useRoles = (all_data = false, page = 1) => {
  return useData(RolesApi, "roles", null, { all_data, page }, 1000 * 60 * 5);
};
export const useRol = (id) => useData(RolesApi, "rol", id);
export const useRolMutations = () => useEntityMutations(RolesApi, "Rol");

//inventarios
export const useInventarios = (all_data = false, page = 1) => {
  return useData(
    InventariosAPI,
    "inventarios",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useInventario = (id) => useData(InventariosAPI, "inventario", id);
export const useInventarioMutations = () =>
  useEntityMutations(InventariosAPI, "Inventario");

//almacenes
export const useAlmacenes = (all_data = false, page = 1) => {
  return useData(
    AlmacenesApi,
    "almacenes",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useAlmacen = (id) => useData(AlmacenesApi, "almacen", id);
export const useAlmacenMutations = () =>
  useEntityMutations(AlmacenesApi, "Almacen");

//movimientos
export const useMovimientos = (all_data = false, page = 1) => {
  return useData(
    MovimientosAPI,
    "movimientos",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useMovimiento = (id) => useData(MovimientosAPI, "movimiento", id);
export const useMovimientoMutations = () =>
  useEntityMutations(MovimientosAPI, "Movimiento");

//tipos de movimiento
export const useTipMovs = (all_data = false, page = 1) => {
  return useData(TipMovsApi, "tipMov", null, { all_data, page }, 1000 * 60 * 5);
};
export const useTipMov = (id) => useData(TipMovsApi, "tipMovs", id);
export const useTipMovMutations = () =>
  useEntityMutations(TipMovsApi, "Inventario");

//ventas
export const useVentas = (all_data = false, page = 1) => {
  return useData(VentasAPI, "ventas", null, { all_data, page }, 1000 * 60 * 5);
};
export const useVenta = (id) => useData(VentasAPI, "venta", id);
export const useVentaMutations = () => useEntityMutations(VentasAPI, "Venta");

//detalles de venta
export const useDetaVentas = (all_data = false, page = 1) => {
  return useData(
    DetVentasAPI,
    "detVentas",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useDetVenta = (id) => useData(DetVentasAPI, "detVenta", id);
export const useDetVentaMutations = () =>
  useEntityMutations(DetVentasAPI, "Detalle de la venta");

// password reset
export const usePasswordResetConfirm = () => {
  return useMutationWithToast(
    ({ token, password }) => PasswordResetAPI.confirmReset(token, password),
    "Reestableciendo contraseña...",
    "Contraseña reestablecida con éxito",
    null
  );
};
export const usePasswordResetRequest = () => {
  return useMutationWithToast(
    (email) => PasswordResetAPI.requestReset(email),
    "Solicitud de restablecimiento de contraseña enviada",
    "Error al solicitar el restablecimiento de contraseña",
    null
  );
};
