import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiAlmacenes = createApi("almacenes");

export const AlmacenesApi = createCrudOperations(ApiAlmacenes, "almacenes");
export const TipMovsApi = createCrudOperations(ApiAlmacenes, "tipos-movimiento");
export const InventariosAPI = createCrudOperations(ApiAlmacenes, "inventarios");
export const MovimientosAPI = createCrudOperations(ApiAlmacenes, "movimientos");
