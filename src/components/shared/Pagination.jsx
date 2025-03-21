const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          Anterior
        </button>
  
        <span className="px-4 py-2 border rounded bg-gray-100">
          {`Página ${currentPage} de ${totalPages}`}
        </span>
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 border rounded ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
        >
          Siguiente
        </button>
      </div>
    );
  };
  
  export default Pagination;
  