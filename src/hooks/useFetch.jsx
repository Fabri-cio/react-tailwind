import { useState, useEffect } from "react";

export function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetchFunction({ signal: controller.signal });
        setData(res.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort(); // Cancelar la petición si el componente se desmonta
  }, [fetchFunction]);

  return { data, loading, error };
}
