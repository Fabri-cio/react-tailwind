import useData from "./useData";
import { useEntityMutations } from "./useEntityMutations";
import {
  ProductosAPI,
  CategoriasAPI,
  ProveedoresAPI,
} from "../api/producto.api";
import { UsuariosAPI, RolesApi, PasswordResetAPI } from "../api/usuario.api";
import {
  InventariosAPI,
  TipMovsApi,
  AlmacenesApi,
  MovimientosAPI,
} from "../api/almacen.api";
import { VentasAPI, DetVentasAPI, DetallesVentaAPI } from "../api/venta.api";
import { useMutationWithToast } from "./useMutationWithToast";

//productos
export const useProducts = (
  params = {},
  enabled = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    ProductosAPI,
    "productos",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};

//para obtener un solo producto
export const useProduct = (id) =>
  useData(ProductosAPI, "producto", id, {}, 1000 * 60 * 5, !!id);
//para mutaciones de productos
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
    UsuariosAPI,
    "users",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useUser = (id) => useData(UsuariosAPI, "user", id);
export const useUserMutations = () =>
  useEntityMutations(UsuariosAPI, "Usuario");

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
//productos
export const useMovimientos = (
  params = {},
  enabled = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    MovimientosAPI,
    "movimientos",
    null,
    mergedParams,
    staleTime,
    enabled
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
export const useVentas = (
  params = {},
  enabled = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    VentasAPI,
    "ventas",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useVenta = (id) =>
  useData(VentasAPI, "venta", id, {}, 1000 * 60 * 5, !!id);
export const useVentaMutations = () => useEntityMutations(VentasAPI, "Venta");

//detalles de venta
export const useDetallesVenta = (
  params = {},
  enabled = true,
  staleTime = 1000 * 60 * 5
) => {
  const defaultParams = {
    all_data: false,
    page: 1,
    per_page: 10,
    filters: {},
    ordering: "",
    search: "",
  };

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    DetallesVentaAPI,
    "detalles-Venta",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};

export const useDetaVentas = (all_data = false, page = 1) => {
  return useData(
    DetVentasAPI,
    "detVentas",
    null,
    { all_data, page },
    1000 * 60 * 5
  );
};
export const useDetalleVenta = (id) =>
  useData(DetallesVentaAPI, "detalle-venta", id, {}, 1000 * 60 * 5, !!id);
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
