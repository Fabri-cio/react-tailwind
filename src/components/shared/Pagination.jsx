import { ActionButton } from "./ActionButton";
import { memo } from "react";

const Pagination = memo(({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const handlePageChange = (newPage) => {
    if (
      onPageChange &&
      typeof onPageChange === "function" &&
      newPage >= 1 &&
      newPage <= totalPages
    ) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <ActionButton
        onClick={() => handlePageChange(currentPage - 1)}
        label="Anterior"
        color="blue"
        disabled={currentPage === 1} // Deshabilita si está en la primera página
      />

      <span className="px-4 py-2 border rounded bg-gray-100">
        {`Página ${currentPage} de ${totalPages}`}
      </span>

      <ActionButton
        onClick={() => handlePageChange(currentPage + 1)}
        label="Siguiente"
        color="blue"
        disabled={currentPage >= totalPages} // Deshabilita si está en la última página
      />
    </div>
  );
});

export default Pagination;
