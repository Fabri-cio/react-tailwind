import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de ventas
const ApiVentas = createApiInstance("http://localhost:8000/api/v1/ventas/");

// Función para crear la venta
export const createVenta = (venta) => request(ApiVentas, "post", "", venta);

// Función para obtener detalles de una venta
export const getVentaDetalles = (id) => request(ApiVentas, "get", `${id}/detalles/`);
