import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
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

  // Aquí extraemos los parámetros de URL y la función para actualizarlos
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
    currentPage,
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

  // Funciones para manejar cambios en la paginación y filtros
  const handlePageChange = (newPage) => {
    setQueryParams({ page: newPage });
  };

  const manejarFiltro = (nuevosValores) => {
    setQueryParams(nuevosValores);
  };

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="bg-white">
      <Navigation
        title={title}
        subTitle={`${subTitle}`}
        actions={actions}
        icon={icon}
      />

      <div className="flex justify-between mx-2">
        <FiltroBusquedaOrden
          onChange={manejarFiltro}
          filtros={filtros}
          ordenes={ordenes}
          placeholderSearch="Buscar..."
        />

        <div className="flex justify-end items-center gap-4">
          <SeleccionarPorPagina
            perPage={per_page}
            setQueryParams={setQueryParams}  // <--- Aquí pasamos setQueryParams
            allData={all_data}
            page={page}
            search={search}
            ordering={ordering}
            filters={filters}
          />

          {hasPagination && (
            <Pagination
              current_page={page}
              nextPage={next}
              prevPage={previous}
              onPageChange={handlePageChange}
              total={totalItems}
              total_pages={total_pages}
              perPage={perPageResponse || per_page}
            />
          )}
        </div>
      </div>

      <Table
        items={items}
        fields={entityFields()}
        currentPage={page}
        itemsPerPage={perPageResponse || per_page}
        itemKey={itemKey || "id"}
      />
    </div>
  );
}

export default EntityList;
