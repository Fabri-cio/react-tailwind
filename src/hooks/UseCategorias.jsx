// useCategorias.js
import { useState, useEffect } from "react";
import { getAllCategorias } from "../api/producto.api";

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState(null);

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await getAllCategorias();
        setCategorias(res.data);
      } catch (err) {
        setErrorCategorias(err.message);
      } finally {
        setLoadingCategorias(false);
      }
    }

    fetchCategorias();
  }, []);

  return { categorias, loadingCategorias, errorCategorias };
}
