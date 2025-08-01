import useData from "./useData";
import { useEntityMutations } from "./useEntityMutations";
import {
  ProductosAPI,
  CategoriasAPI,
  ProveedoresAPI,
} from "../api/producto.api";
import {
  UsuariosAPI,
  RolesApi,
  PasswordResetAPI,
  PermisosApi,
} from "../api/usuario.api";
import {
  InventariosAPI,
  TipMovsApi,
  AlmacenesApi,
  MovimientosAPI,
} from "../api/almacen.api";
import {
  ClientesAPI,
  VentasAPI,
  DetallesVentaAPI,
  ComprobantesVentaAPI,
} from "../api/venta.api";
import { useMutationWithToast } from "./useMutationWithToast";

const DEFAULT_STALE_TIME = 1000 * 60 * 5;
const DEFAULT_PARAMS = {
  all_data: false,
  page: 1,
  per_page: 10,
  filters: {},
  ordering: "",
  search: "",
};

//productos
export const useProducts = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

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
export const useCategorias = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    CategoriasAPI,
    "categorias",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useCategoria = (id) =>
  useData(CategoriasAPI, "categoria", id, {}, 1000 * 60 * 5, !!id);
export const useCategoriaMutations = () =>
  useEntityMutations(CategoriasAPI, "Categoria");

//proveedores
export const useProveedores = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    ProveedoresAPI,
    "proveedores",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useProveedor = (id) =>
  useData(ProveedoresAPI, "proveedor", id, {}, 1000 * 60 * 5, !!id);
export const useProveedorMutations = () =>
  useEntityMutations(ProveedoresAPI, "Proveedor");

//users
export const useUsuarios = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    UsuariosAPI,
    "usuarios",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useUsuario = (id) =>
  useData(UsuariosAPI, "usuario", id, {}, 1000 * 60 * 5, !!id);
export const useUsuarioMutations = () =>
  useEntityMutations(UsuariosAPI, "Usuario");

//roles
export const useRoles = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(RolesApi, "roles", null, mergedParams, staleTime, enabled);
};
export const useRol = (id) =>
  useData(RolesApi, "rol", id, {}, 1000 * 60 * 5, !!id);
export const useRolMutations = () => useEntityMutations(RolesApi, "Rol");

//permisos
export const usePermisos = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    PermisosApi,
    "permisos",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};

//inventarios
export const useInventarios = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    InventariosAPI,
    "inventarios",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useInventario = (id) =>
  useData(InventariosAPI, "inventario", id, {}, 1000 * 60 * 5, !!id);
export const useInventarioMutations = () =>
  useEntityMutations(InventariosAPI, "Inventario");

//almacenes
export const useAlmacenes = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(
    AlmacenesApi,
    "almacenes",
    null,
    mergedParams,
    staleTime,
    enabled
  );
};
export const useAlmacen = (id) =>
  useData(AlmacenesApi, "almacen", id, {}, 1000 * 60 * 5, !!id);
export const useAlmacenMutations = () =>
  useEntityMutations(AlmacenesApi, "Almacen");

//movimientos
export const useMovimientos = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

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
export const useMovimiento = (id) =>
  useData(MovimientosAPI, "movimiento", id, {}, 1000 * 60 * 5, !!id);
export const useMovimientoMutations = () =>
  useEntityMutations(MovimientosAPI, "Movimiento");

//tipos de movimiento
export const useTipMovs = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(TipMovsApi, "tipMov", null, mergedParams, staleTime, enabled);
};
export const useTipMov = (id) =>
  useData(TipMovsApi, "tipMovs", id, {}, 1000 * 60 * 5, !!id);
export const useTipMovMutations = () =>
  useEntityMutations(TipMovsApi, "Inventario");

//ventas
export const useVentas = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

  const mergedParams =
    //params sobreescribe defaultParams si hay campos repetidos
    { ...defaultParams, ...params };
  return useData(VentasAPI, "ventas", null, mergedParams, staleTime, enabled);
};
export const useVenta = (id) =>
  useData(VentasAPI, "venta", id, {}, 1000 * 60 * 5, !!id);
export const useVentaMutations = () => useEntityMutations(VentasAPI, "Venta");

//detalles de venta
export const useDetallesVentas = (
  params = {},
  enabled = true,
  staleTime = DEFAULT_STALE_TIME
) => {
  const defaultParams = DEFAULT_PARAMS;

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
export const useDetallesVenta = (id) =>
  useData(DetallesVentaAPI, "detalle-venta", id, {}, 1000 * 60 * 5, !!id);
export const useDetallesVentaMutations = () =>
  useEntityMutations(DetallesVentaAPI, "Detalle de la venta");

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
