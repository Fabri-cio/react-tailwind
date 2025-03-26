import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiVentas = createApi("ventas")

// Crear operaciones CRUD específicas para las ventas
export const VentasAPI = createCrudOperations(ApiVentas, "ventas");
export const DetVentasAPI = createCrudOperations(ApiVentas, "detalles-venta");

