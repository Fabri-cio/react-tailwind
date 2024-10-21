import { useState, useEffect } from "react";
import { getAllProductos } from "../api/producto.api"; // Llamada a la API

export function useProductos() {
  const [producto, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const res = await getAllProductos(); // Llamada a la API
        setProductos(res.data); // Guardar productos en el estado
      } catch (err) {
        setError(err.message); // Capturar error en caso de que ocurra
      } finally {
        setLoading(false); // Finalizar loading
      }
    }

    fetchProductos();
  }, []);

  return { producto, loading, error }; // Retorna los productos, loading y el error
}
