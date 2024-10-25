// useProductos.js
import { useState, useEffect } from "react";
import { getAllProductos } from "../api/producto.api";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loadingProductos, setLoadingProductos] = useState(true);
  const [errorProductos, setErrorProductos] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await getAllProductos();
        setProductos(res.data);
      } catch (err) {
        setErrorProductos(err.message);
      } finally {
        setLoadingProductos(false);
      }
    }

    fetchProductos();
  }, []);

  return { productos, loadingProductos, errorProductos };
}
