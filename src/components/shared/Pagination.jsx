import { ActionButton } from "./ActionButton";

const Pagination = ({
  currentPage = 1,
  count = 0,
  nextPage = null,
  prevPage = null,
  onPageChange,
}) => {
  const handlePageChange = (newPage) => {
    if (onPageChange && typeof onPageChange === "function") {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center space-x-2 p-3 bg-yellow-600">
      <ActionButton
        onClick={() => handlePageChange(currentPage - 1)}
        label="Anterior"
        estilos=" bg-blue-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        disabled={!prevPage} // Deshabilita si está en la primera página
      />

      <span className="px-4 py-2 border rounded bg-gray-100">
        {`Página ${currentPage} de ${
          nextPage ? currentPage + 1 : currentPage
        } de ${count}`}
      </span>

      <ActionButton
        onClick={() => handlePageChange(currentPage + 1)}
        label="Siguiente"
        estilos=" bg-blue-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
        disabled={!nextPage} // Deshabilita si está en la última página
      />
    </div>
  );
};

export default Pagination;
