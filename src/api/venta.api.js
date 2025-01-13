import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de ventas
const ApiVentas = createApiInstance("http://localhost:8000/api/v1/ventas/");

// Función para crear la venta
export const getAllVentas = () => request(ApiVentas, "get", "ventas/");
export const getVenta = (id) => request(ApiVentas, "get", `ventas/${id}`);
export const createVenta = (venta) =>
  request(ApiVentas, "post", "ventas/", venta);
export const updateVenta = (id, venta) =>
  request(ApiVentas, "put", `ventas/${id}/`, venta);
export const deleteVenta = (id) =>
  request(ApiVentas, "delete", `ventas/${id}/`);

// Función para obtener detalles de una venta
export const getAllVentaDetalle = () =>
  request(ApiVentas, "get", "detalles-venta/");
export const getVentaDetalle = (id) =>
  request(ApiVentas, "get", `detalles-venta/${id}`);
export const createVentaDetalle = (detalle) =>
  request(ApiVentas, "post", "detalles-venta/", detalle);
export const updateVentaDetalle = (id, detalle) =>
  request(ApiVentas, "put", `detalles-venta/${id}/`, detalle);
export const deleteVentaDetalle = (id) =>
  request(ApiVentas, "delete", `detalles-venta/${id}/`);
