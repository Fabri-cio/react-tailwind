import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiVentas = createApi("ventas")

// Crear operaciones CRUD específicas para las ventas
export const VentasAPI = createCrudOperations(ApiVentas, "ventas");
export const DetallesVentaAPI = createCrudOperations(ApiVentas, "detalles-venta");

