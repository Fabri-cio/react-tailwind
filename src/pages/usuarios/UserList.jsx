import { ActionButton } from "../../components/shared/ActionButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import FormattedDate from "../../components/shared/FormattedDate";
import EntityList from "../../components/shared/EntityList";
import { useUsers } from "../../hooks/useEntities";
import { FaPlusCircle } from "react-icons/fa";

function UserList() {
  const userFields = (handleDetallesClick) => [
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
          onClick={() => handleDetallesClick(item.id)} // Usamos onClick para llamar a la función de detalles
          label="Editar"
          estilos={
            "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200"
          }
        />
      ),
    },
  ];

  const entityData = {
    title: "Gestión de Usuarios",
    subTitle: "Listado de usuarios",
    listPath: "/home",
    loadingMessage: "Cargando usuarios...",
    errorMessage: "Error al obtener los usuarios",
    fetchDataHook: useUsers,
    editPath: "/editUser",
    all_data: false,
    entityFields: userFields,
    actions: [  
      {
        to: "/createUser",
        label: "Crear Usuario",
        icon: FaPlusCircle,
        estilos:
          "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      }
    ],
  };

  return <EntityList entityData={entityData} />;
}

export default UserList;
