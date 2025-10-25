import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiAlmacenes = createApi("inventarios");

export const AlmacenesApi = createCrudOperations(ApiAlmacenes, "almacenes");
export const TipMovsApi = createCrudOperations(ApiAlmacenes, "tipos-movimiento");
export const InventariosAPI = createCrudOperations(ApiAlmacenes, "inventarios");
export const MovimientosAPI = createCrudOperations(ApiAlmacenes, "movimientos");

export const InventariosVentasAPI = createCrudOperations(ApiAlmacenes, "inventarios-ventas");

export const MetodoABC = createCrudOperations(ApiAlmacenes, "inventarios-abc");

export const InventariosCarritoAPI = createCrudOperations(ApiAlmacenes, "inventarios-carrito");

export const InventariosListAPI = createCrudOperations(ApiAlmacenes, "inventarios-list");
export const AlmacenesListAPI = createCrudOperations(ApiAlmacenes, "almacenes-list");
export const MovimientosListAPI = createCrudOperations(ApiAlmacenes, "movimientos-list");

export const AlmacenesSelectAPI = createCrudOperations(ApiAlmacenes, "almacenes-select");
export const InventarioSelectAPI = createCrudOperations(ApiAlmacenes, "inventarios-select");
export const TiposMovimientoSelectAPI = createCrudOperations(ApiAlmacenes, "tipos-movimiento-select");

export const InventarioPedidosAPI = createCrudOperations(ApiAlmacenes, "inventarios-pedidos");

export const InventarioReporteAPI = createCrudOperations(ApiAlmacenes, "inventarios-reporte");




