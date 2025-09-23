import { createApi } from "../api/api.config";
import { createCrudOperations } from "../api/api.crud";

const ApiVentas = createApi("ventas")

// Crear operaciones CRUD específicas para las ventas
export const ClientesAPI = createCrudOperations(ApiVentas, "clientes");
export const VentasAPI = createCrudOperations(ApiVentas, "ventas");
export const VentasReporteAPI = createCrudOperations(ApiVentas, "ventas-reporte");
export const DetallesVentaAPI = createCrudOperations(ApiVentas, "detalles-venta");
export const ComprobantesVentaAPI = createCrudOperations(ApiVentas, "comprobantes-venta");

