// import { createApiInstance, request } from "./api.Base";

// // Crear instancia específica para la API de ventas
// const ApiVentas = createApiInstance("http://localhost:8000/api/v1/ventas/");

// // Función para crear la venta
// export const getAllVentas = () => request(ApiVentas, "get", "ventas/");
// export const getVenta = (id) => request(ApiVentas, "get", `ventas/${id}`);
// export const createVenta = (venta) =>
//   request(ApiVentas, "post", "ventas/", venta);
// export const updateVenta = (id, venta) =>
//   request(ApiVentas, "put", `ventas/${id}/`, venta);
// export const deleteVenta = (id) =>
//   request(ApiVentas, "delete", `ventas/${id}/`);

// // Función para obtener detalles de una venta
// export const getAllVentaDetalle = () =>
//   request(ApiVentas, "get", "detalles-venta/");
// export const getVentaDetalle = (id) =>
//   request(ApiVentas, "get", `detalles-venta/${id}`);
// export const createVentaDetalle = (detalle) =>
//   request(ApiVentas, "post", "detalles-venta/", detalle);
// export const updateVentaDetalle = (id, detalle) =>
//   request(ApiVentas, "put", `detalles-venta/${id}/`, detalle);
// export const deleteVentaDetalle = (id) =>
//   request(ApiVentas, "delete", `detalles-venta/${id}/`);

// api/venta.api.js

import { createApiInstance, request } from "./api.Base";

// Crear instancia específica para la API de ventas
// const ApiVentas = createApiInstance("http://localhost:8000/api/v1/ventas/");
const ApiVentas = createApiInstance(`${ApiBaseURL}/ventas/`);

// Función genérica para operaciones CRUD
const createCrudOperations = (apiInstance, resource) => ({
  getAll: () => request(apiInstance, "get", `${resource}/`),
  getOne: (id) => request(apiInstance, "get", `${resource}/${id}`),
  create: (data) => request(apiInstance, "post", `${resource}/`, data),
  update: (id, data) => request(apiInstance, "put", `${resource}/${id}/`, data),
  delete: (id) => request(apiInstance, "delete", `${resource}/${id}/`),
});

// Crear operaciones CRUD específicas para las ventas
export const VentasAPI = createCrudOperations(ApiVentas, "ventas");
export const DetallesVentaAPI = createCrudOperations(ApiVentas, "detalles-venta");

