import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import FiltroBusquedaOrden from "../../components/shared/FiltroBusquedaOrden";
import { useState } from "react";
import { SeleccionarPorPagina } from "./SeleccionarPorPagina";

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

  //Los set son para modificar los estados de las variables
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10); //Estado inicial
  const [allData, setAllData] = useState(false);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [ordering, setOrdering] = useState("");

  // Función para actualizar filtros específicos
  const manejarFiltro = (nuevosValores) => {
    // Extraemos los valores desde el objeto combinado que viene desde FiltroBusquedaOrden
    const { search, ordering, ...restFilters } = nuevosValores;
    setSearch(search || "");
    setOrdering(ordering || "");
    setFilters(restFilters || {});
    setPage(1);
  };

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook, {
    //Enviar lo que ser requiere
    all_data: allData,
    page: page,
    per_page: perPage,
    search: search,
    filters: filters,
    ordering: ordering, //El azul es el estado inicial y posiblemente el celeste sea el nombre
  });

  const {
    currentPage,
    handlePageChange,
    isLoading,
    isError,
    items,
    totalItems,
    hasPagination,
    next,
    previous,
    per_page,
    total_pages,
  } = paginacion;

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="bg-white">
      {/* este es el div principal*/}
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
          pleholderSearacch="Search"
        />
        <div className="flex justify-end items-center">
          <SeleccionarPorPagina
            perPage={perPage}
            setPerPage={setPerPage}
            setAllData={setAllData}
            setPage={setPage}
            allData={allData}
          />
          {hasPagination && (
            <Pagination
              current_page={currentPage}
              nextPage={next}
              prevPage={previous}
              onPageChange={handlePageChange}
              total={totalItems}
              total_pages={total_pages}
              perPage={perPage}
              setPerPage={setPerPage}
              setAllData={setAllData}
              setPage={setPage}
              allData={allData}
            />
          )}
        </div>
      </div>
      <Table
        items={items}
        fields={entityFields()}
        currentPage={currentPage}
        itemsPerPage={per_page}
        itemKey={itemKey || "id"}
      />
    </div>
  );
}

export default EntityList;
