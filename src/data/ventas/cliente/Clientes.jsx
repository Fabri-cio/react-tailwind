import { useClientes } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function Clientes() {
  const camposClientes = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/clientes/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "nombre",
      label: "Nombre",
    },
    { key: "correo", label: "Correo" },
    { key: "nit_ci", label: "Nit/CI" },
  ];

  const entityData = {
    title: <Link to="/clientes">Clientes del Sistema</Link>,
    subTitle: "",
    loadingMessage: "Cargando clientes...",
    errorMessage: "Error al obtener los clientes",
    fetchDataHook: useClientes,
    itemKey: "id", //id_cliente.  Es muy necesario para la tabla el itemKey
    entityFields: camposClientes,
    actions: [
      {
        to: "/createCliente",
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

export default Clientes;
