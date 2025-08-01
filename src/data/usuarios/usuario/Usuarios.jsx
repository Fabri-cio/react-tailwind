import { StatusBadge } from "@/components/shared/StatusBadge";
import FormattedDate from "../../../components/shared/FormattedDate";
import EntityList from "../../../components/shared/EntityList";
import { useUsuarios } from "../../../hooks/useEntities";
import { ActionButton } from "../../../components/shared/ActionButton";
import { FaEdit, FaHistory, FaPlus, FaUber } from "react-icons/fa";

function UserList() {
  const userFields = () => [
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editUsuario/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/historialUsuario/${item.id}`}
            icon={FaHistory}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "full_name",
      label: "Nombre",
      render: (item) => item.first_name + " " + item.last_name,
    },
    { key: "username", label: "Usuario" },
    { key: "rol", label: "Rol" },
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
  ];

  const entityData = {
    title: "Gestión de Usuarios",
    subTitle: "Listado de usuarios",
    loadingMessage: "Cargando usuarios...",
    errorMessage: "Error al obtener los usuarios",
    fetchDataHook: useUsuarios,
    itemKey: "id",
    entityFields: userFields,
    actions: [
      {
        to: "/createUsuario",
        icon: FaPlus,
        estilos: "text-white bg-violet-500 rounded-full p-2",
      },
    ],
    icon: FaUber,
  };

  return <EntityList entityData={entityData} />;
}

export default UserList;
