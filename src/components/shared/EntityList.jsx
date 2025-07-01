import Table from "../../components/shared/Table";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessaje";
import Pagination from "../../components/shared/Pagination";
import { Navigation } from "../../components/shared/Navigation";
import { useFormEntity } from "../../utils/useFormEntity";

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
  } = entityData;

  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(fetchDataHook);

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
    <div className="space-y-1 p-4">
      {" "}
      {/* este es el div principal*/}
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
        itemsPerPage={per_page}
        itemKey={itemKey || "id"}
      />
      {hasPagination && (
        <Pagination
          current_page={currentPage}
          nextPage={next}
          prevPage={previous}
          onPageChange={handlePageChange}
          total={totalItems}
          total_pages={total_pages}
        />
      )}
    </div>
  );
}

export default EntityList;
