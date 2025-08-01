import { FaUser, FaPlus, FaEdit } from "react-icons/fa";
import { EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { useRoles } from "../../../hooks/useEntities";

function Roles() {
  const rolesFields = () => [
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editRol/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    { key: "name", label: "Nombre" },
  ];

  const entityData = {
    title: "Gestion de Roles",
    subTitle: "",
    loadingMessage: "Cargando roles...",
    errorMessage: "Error al obtener roles",
    fetchDataHook: useRoles,
    itemKey: "id",
    entityFields: rolesFields,
    icon: FaUser,
    actions: [
      {
        to: "/createRol",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
  };
  return <EntityList entityData={entityData} />;
}

export default Roles;
