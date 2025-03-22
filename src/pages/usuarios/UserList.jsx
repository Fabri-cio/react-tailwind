import { useNavigate } from "react-router-dom";
import useUsers from "../../hooks/useUsers";
import { Navigation } from "@/components/shared/Navigation";
import Table from "@/components/shared/Table";
import { ActionButton } from "@/components/shared/ActionButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessaje";
import Pagination from "@/components/shared/Pagination";
import usePagination from "@/hooks/usePagination";
import FormattedDate from "../../components/shared/FormattedDate";

function UserList() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = usePagination();
  const {
    data: response = {},
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useUsers(false, currentPage);

  const usuarios = response.data?.results || response.data?.data || [];
  const totalUsers = response.data?.count || 0;
  const totalPages = Math.ceil(totalUsers / 10);

  const handleDetallesClick = (usuario) => {
    navigate(`/editUser/${usuario.id}`, { state: { usuario } });
  };

  const userFields = [
    { key: "index", label: "#" },
    {
      key: "full_name",
      label: "Nombre",
      render: (item) => `${item.first_name} ${item.last_name}`,
    },
    { key: "username", label: "Usuario" },
    { key: "name_rol", label: "Rol" },
    { key: "name_work", label: "Lugar de Trabajo" },

    {
      key: "is_active",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.is_active} />,
    },
    {
      key: "date_joined", // Antes estaba como data_joined (incorrecto)
      label: "Fecha de Registro",
      render: (item) => <FormattedDate date={item.date_joined} />,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <ActionButton
          onClick={() => handleDetallesClick(item)} // Usamos onClick para llamar a la función de detalles
          label="Editar"
          color="blue"
        />
      ),
    },
  ];

  if (loadingUsers) return <Loading message="Cargando usuarios..." />;
  if (errorUsers)
    return <ErrorMessage message="Error al obtener los usuarios" />;

  return (
    <div className="container mx-auto p-4">
      <Navigation
        entityName="Usuarios"
        listPath="/userList"
        subTitle="Listado de Usuarios"
        actions={[
          { to: "/createUser", label: "Crear Usuario", color: "green" },
        ]}
      />
      <hr />
      <Table
        items={usuarios}
        fields={userFields} // Ahora `Table` se encarga de renderizar las filas
      />
      {/* Agregar paginación */}
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

export default UserList;
