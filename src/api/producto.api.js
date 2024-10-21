import axios from "axios";

const productoApi = axios.create({
  baseURL: "http://localhost:8000/producto/api/v1/producto/",
});

export const getAllProductos = () => productoApi.get("/");

export const getProducto = (id) => productoApi.get(`/${id}`)

export const updateProducto = (id, producto) => productoApi.put(`/${id}/`, producto);
