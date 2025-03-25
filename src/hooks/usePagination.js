// src/hooks/usePagination.js
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extraer número de página de la URL
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  // Función para manejar el cambio de página
  const handlePageChange = useCallback(
    (page) => {
      if (page !== currentPage) {
        navigate(`/productList?page=${page}`);
      }
    },
    [navigate, currentPage]
  );

  return {
    currentPage,
    handlePageChange,
  };
};

export default usePagination;
