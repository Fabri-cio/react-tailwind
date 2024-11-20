import { useState, useEffect } from "react";

export function useFetch(fetchFunction, retries = 3, delay = 1000) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    let attempts = 0;

    async function fetchData() {
      while (attempts < retries) {
        try {
          const res = await fetchFunction({ signal });
          setData(res.data);
          setError(null);
          break; // Salir del bucle si la petición tiene éxito
        } catch (err) {
          if (err.name === "AbortError") {
            // Si la petición fue cancelada, salir
            break;
          }
          attempts++;
          setError(err.message || "Error desconocido");
          if (attempts < retries) {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
      setLoading(false);
    }

    fetchData();

    return () => controller.abort(); // Cancelar la petición si el componente se desmonta
  }, [fetchFunction, retries, delay]);

  return { data, loading, error };
}
