import { useNavigate } from "react-router-dom";
import Table from "@/components/shared/Table";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessaje";
import Pagination from "@/components/shared/Pagination";
import usePagination from "../../hooks/usePagination";
import { Navigation } from "../../components/shared/Navigation";

function EntityList({ entityData }) {
  const {
    title,
    fetchDataHook,
    entityFields,
    editPath,
    loadingMessage,
    errorMessage,
    listPath,
    subTitle,
    all_data,
    actions = [],
  } = entityData; // Desestructuramos entityConfig

  const navigate = useNavigate();
  const { currentPage, handlePageChange } = usePagination();
  const {
    data: response = {},
    isLoading,
    isError,
  } = fetchDataHook(all_data, currentPage);

  const {count = 0, next = null, previous = null, results = []} = response.data || {};

  const items = results || response.data?.data || [];
  const totalItems = count 
  const totalPages = Math.ceil(totalItems / 10);

  const handleDetallesClick = (id) => {
    navigate(`${editPath}/${id}`);
  };

  if (isLoading) return <Loading message={loadingMessage} />;
  if (isError) return <ErrorMessage message={errorMessage} />;

  return (
    <div className="container mx-auto p-4">
      <Navigation
        title={title}
        listPath={`${listPath}`}
        subTitle={`${subTitle}`}
        actions={actions}
      />
      <Table items={items} fields={entityFields(handleDetallesClick)} />
      {!response.all_data && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default EntityList;
