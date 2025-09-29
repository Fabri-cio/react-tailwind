import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "./Error";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import FiltroBusquedaOrden from "../../components/shared/FiltroBusquedaOrden";
import { SeleccionarPorPagina } from "./SeleccionarPorPagina";
import useQueryParams from "../../hooks/useQueryParams";

function EntityList({ entityData }) {
  const {
    title,
    fetchDataHook,
    entityFields,
    loadingMessage,
    errorMessage,
    subTitle,
    itemKey,
    actions = [],
    icon,
    filtros,
    ordenes,
  } = entityData;

  const {
    page,
    per_page,
    all_data,
    search,
    ordering,
    filters,
    setQueryParams,
  } = useQueryParams();

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook, {
    all_data,
    page,
    per_page,
    search,
    filters,
    ordering,
  });

  const {
    isLoading,
    isError,
    items,
    totalItems,
    hasPagination,
    next,
    previous,
    per_page: perPageResponse,
    total_pages,
  } = paginacion;

  // Cambiar página
  const manejarCambioPagina = (nuevaPagina) => {
    setQueryParams({ page: nuevaPagina });
  };

  // Cambiar filtros/búsqueda
  const manejarCambioFiltros = (nuevosValores) => {
    setQueryParams({ ...nuevosValores, page: 1 });
  };

  // Reiniciar búsqueda y filtros
  const reiniciarFiltros = () => {
    setQueryParams({
      search: "",
      filters: {},
      ordering: "",
      page: 1,
      all_data: false,
    });
  };

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="bg-white">
      <Navigation title={title} subTitle={subTitle} actions={actions} icon={icon} />

      <div className="flex justify-between mx-2">
        <FiltroBusquedaOrden
          onChange={manejarCambioFiltros}
          filtros={filtros}
          ordenes={ordenes}
          placeholderSearch="Buscar..."
        />

        <div className="flex items-center gap-4">
          <SeleccionarPorPagina
            perPage={per_page}
            setQueryParams={setQueryParams}
            allData={all_data}
            search={search}
            ordering={ordering}
            filters={filters}
          />

          {hasPagination && (
            <Pagination
              current_page={page}
              nextPage={next}
              prevPage={previous}
              onPageChange={manejarCambioPagina}
              total={totalItems}
              total_pages={total_pages}
              perPage={perPageResponse || per_page}
            />
          )}
        </div>
      </div>

      {items.length > 0 ? (
        <Table
          items={items}
          fields={entityFields()}
          currentPage={page}
          itemsPerPage={perPageResponse || per_page}
          itemKey={itemKey || "id"}
        />
      ) : (
        <div className="text-center p-6">
          <p className="text-gray-600 mb-2">
            No se encontraron resultados para tu búsqueda o filtros.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={reiniciarFiltros}
          >
            Mostrar todos los datos
          </button>
        </div>
      )}
    </div>
  );
}

export default EntityList;
