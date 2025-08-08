import { useAlmacenes } from "../../../hooks/useEntities";
import { EntityList, ActionButton, StatusBadge } from "../../../components/shared";
import { FaBox, FaPlus, FaEdit } from "react-icons/fa";

export default function Almacenes() {
  const almacenesFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editAlmacen/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    { key: "nombre", label: "Nombre" },
    { key: "direccion", label: "Dirección" },
    { key: "telefono", label: "Teléfono" },
    {
      key: "es_principal",
      label: "Es principal",
      render: (item) => <StatusBadge isActive={item.es_principal} />,
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
  ];

  const entityData = {
    title: "Almacenes",
    subTitle: "Lista de almacenes",
    loadingMessage: "Cargando almacenes...",
    errorMessage: "Error al obtener los almacenes",
    fetchDataHook: useAlmacenes,
    itemKey: "id_almacen",
    entityFields: almacenesFields,
    actions: [
      {
        to: "/createAlmacen",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
  };

  return <EntityList entityData={entityData} />;
}
