import { createApi } from "./api.config";
import { createCrudOperations } from "./api.crud";

const ApiAlmacenes = createApi("inventarios");

export const AlmacenesApi = createCrudOperations(ApiAlmacenes, "almacenes");
export const TipMovsApi = createCrudOperations(ApiAlmacenes, "tipos-movimiento");
export const InventariosAPI = createCrudOperations(ApiAlmacenes, "inventarios");
export const MovimientosAPI = createCrudOperations(ApiAlmacenes, "movimientos");
