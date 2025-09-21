import { ActionButton } from "./ActionButton";

const Pagination = ({
  current_page = 1,
  total = 0,
  total_pages = 0,
  nextPage = null,
  prevPage = null,
  onPageChange,
}) => {
  const manejarCambioPagina = (nuevaPagina) => {
    if (onPageChange) onPageChange(nuevaPagina);
  };

  const styleBtn =
    "hover:bg-gray-400 hover:text-white h-6 w-10 text-black rounded-md border-2 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-white disabled:text-white disabled:border-white disabled:cursor-not-allowed justify-center";

  return (
    <div className="flex justify-center space-x-2 items-center p-1">
      <ActionButton
        onClick={() => manejarCambioPagina(current_page - 1)}
        label="<"
        estilos={styleBtn}
        disabled={!prevPage}
      />
      <span className="px-4 py-1 border rounded bg-gray-100 text-sm">{`Página ${current_page} de ${total_pages} de ${total}`}</span>
      <ActionButton
        onClick={() => manejarCambioPagina(current_page + 1)}
        label=">"
        estilos={styleBtn}
        disabled={!nextPage}
      />
    </div>
  );
};

export default Pagination;
