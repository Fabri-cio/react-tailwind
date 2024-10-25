import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000/api/v1/productos/",
});

// export const getAllProductos = () => Api.get("productos/");

// export const getProducto = (id) => Api.get(`productos/${id}`)

// export const updateProducto = (id, producto) => Api.put(`productos/${id}/`, producto);

// export const createProducto = (producto) => Api.post("productos/", producto);

export const getAllProductos = async () => {
  try {
    return await Api.get("productos/");
  } catch (error) {
    console.error("Error fetching productos:", error);
    throw error; // O maneja el error de otra manera
  }
};

export const getProducto = async (id) => {
  try {
    return await Api.get(`productos/${id}`);
  } catch (error) {
    console.error("Error fetching producto:", error);
    throw error;
  }
};

export const updateProducto = async (id, producto) => {
  try {
    return await Api.put(`productos/${id}/`, producto);
  } catch (error) {
    console.error("Error updating producto:", error);
    throw error;
  }
};

export const createProducto = async (producto) => {
  try {
    return await Api.post("productos/", producto);
  } catch (error) {
    console.error("Error creating producto:", error);
    throw error;
  }
};

// categorias

// export const getAllCategorias = () => Api.get("categorias/");

// export const getCategoria = (id) => Api.get(`categorias/${id}`)

// export const updateCategoria = (id, categoria) => Api.put(`categorias/${id}/`, categoria);

// export const createCategoria = (categoria) => Api.post("categorias/", categoria);

export const getAllCategorias = async () => {
  try {
    return await Api.get("categorias/");
  } catch (error) {
    console.error("Error fetching categorias:", error);
    throw error;
  }
};

export const getCategoria = async (id) => {
  try {
    return await Api.get(`categorias/${id}`);
  } catch (error) {
    console.error("Error fetching categoria:", error);
    throw error;
  }
};

export const updateCategoria = async (id, categoria) => {
  try {
    return await Api.put(`categorias/${id}/`, categoria);
  } catch (error) {
    console.error("Error updating categoria:", error);
    throw error;
  }
};

export const createCategoria = async (categoria) => {
  try {
    return await Api.post("categorias/", categoria);
  } catch (error) {
    console.error("Error creating categoria:", error);
    throw error;
  }
};