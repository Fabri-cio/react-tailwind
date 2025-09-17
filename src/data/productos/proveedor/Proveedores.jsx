import { useProveedores } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { StatusBadge, EntityList, Image } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function Proveedores() {
  const campos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editProveedor/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "imagen",
      label: "Imagen",
      render: (item) => <Image src={item.imagen} alt={item.nombre} />,
    },
    { key: "marca", label: "Marca" },
    { key: "contacto", label: "Nombre de Contacto" },
    {
      key: "telefono",
      label: "Telefono",
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
  ];

  const entityData = {
    title: <Link to="/proveedores">Catalogo de Proveedores</Link>,
    subTitle: "",
    loadingMessage: "Cargando proveedores...",
    errorMessage: "Error al obtener los proveedores",
    fetchDataHook: useProveedores,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: campos,
    actions: [
      {
        to: "/createProveedor",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
    filtros: [],
    ordenes: [],
  };
  return <EntityList entityData={entityData} />;
}

export default Proveedores;
