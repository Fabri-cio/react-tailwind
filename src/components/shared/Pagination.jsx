import { ActionButton } from "./ActionButton";
import { memo } from "react";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
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
    <div className="flex justify-center space-x-2 mt-4 bg-yellow-600">
      <ActionButton
        onClick={() => handlePageChange(currentPage - 1)}
        label="Anterior"
        estilos=" bg-blue-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        disabled={currentPage === 1} // Deshabilita si está en la primera página
      />

      <span className="px-4 py-2 border rounded bg-gray-100">
        {`Página ${currentPage} de ${totalPages}`}
      </span>

      <ActionButton
        onClick={() => handlePageChange(currentPage + 1)}
        label="Siguiente"
        estilos=" bg-blue-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        disabled={currentPage >= totalPages} // Deshabilita si está en la última página
      />
    </div>
  );
};

export default Pagination;
