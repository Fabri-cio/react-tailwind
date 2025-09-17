import {
  StatusBadge,
  EntityList,
  ActionButton,
  FormattedDate,
} from "@/components/shared";
import { useUsuarios } from "../../../hooks/useEntities";

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
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center p-1"
          />
          {/* <ActionButton
            to={`/historialUsuario/${item.id}`}
            icon={FaHistory}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center p-1"
          /> */}
        </div>
      ),
    },
    { key: "first_name", label: "Nombres" },
    { key: "last_name", label: "Apellidos" },
    { key: "username", label: "Usuario" },
    {
      key: "roles",
      label: "Roles",
      render: (item) => item.roles.map((role) => role.name).join(", "),
    }, //esto en un array [{id, name}]
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
    title: "Usuarios",
    subTitle: "Listado de usuarios del sistema",
    loadingMessage: "Cargando usuarios...",
    errorMessage: "Error al obtener los usuarios",
    fetchDataHook: useUsuarios,
    itemKey: "id",
    entityFields: userFields,
    actions: [
      {
        to: "/createUsuario",
        icon: FaPlus,
        estilos: "text-white bg-green-700 rounded-full p-2",
      },
    ],
    icon: FaUber,
  };

  return <EntityList entityData={entityData} />;
}

export default UserList;
