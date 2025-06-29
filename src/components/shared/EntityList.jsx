import Table from "../../components/shared/Table";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";
import { useCategorias, useProducts } from "../../hooks/useEntities";

function EntityList({ entityData }) {
  const {
    title,
    fetchDataHook,
    entityFields,
    loadingMessage,
    errorMessage,
    subTitle,
    all_data,
    itemKey,
    actions = [],
    icon,
  } = entityData;

  const { todosDatosOpaginacion } = useFormEntity();
  const paginacion = todosDatosOpaginacion(fetchDataHook, all_data);
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
  } = paginacion;

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="space-y-1 px-2 py-1 border-2 border-gray-400 rounded-lg">
      <Navigation
        title={title}
        subTitle={`${subTitle}`}
        actions={actions}
        icon={icon}
      />

      <Table
        items={items}
        fields={entityFields()}
        currentPage={currentPage}
        itemsPerPage={10}
        itemKey={itemKey || "id"}
      />

      {hasPagination && (
        <Pagination
          currentPage={currentPage}
          nextPage={next}
          prevPage={previous}
          onPageChange={handlePageChange}
          count={totalItems}
        />
      )}
    </div>
  );
}

export default EntityList;
