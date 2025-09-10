import { usePedidos } from "../../../hooks/useEntities";
import {
  FaPlus,
  FaBox,
  FaEdit,
  FaShoppingCart,
  FaCheckCircle,
  FaAccusoft,
  FaHourglass,
  FaHourglassHalf,
} from "react-icons/fa";
import { EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";
import { FormattedDate } from "../../../components/shared";

function Pedidos() {
  const productFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editPedido/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center p-1"
            title="Editar Pedido"
          />
          <ActionButton
            to={`/createPedido/${item.id}`}
            icon={item.estado === "Pendiente" ? FaHourglassHalf : FaCheckCircle}
            estilos={
              item.estado === "Pendiente"
                ? "hover:bg-gray-600 hover:text-gray-100 text-gray-300 rounded-md flex items-center p-1"
                : "hover:bg-gray-600 hover:text-green-100 text-green-500 rounded-md flex items-center transition p-1"
            }
            title={
              item.estado === "Pendiente"
                ? "Recepsionar Pedido"
                : "Pedido Recepcionado"
            }
          />
        </div>
      ),
    },
    {
      key: "fecha_creacion",
      label: "Fecha de Creación",
      render: (item) => <FormattedDate date={item.fecha_creacion} />,
    },
    {
      key: "fecha_entrega",
      label: "Fecha de Entrega",
      render: (item) => <FormattedDate date={item.fecha_entrega} />,
    },
    {
      key: "nombre_proveedor",
      label: "Proveedor",
    },
    {
      key: "nombre_almacen",
      label: "Almacen",
    },
    {
      key: "observaciones",
      label: "Observaciones",
    },
  ];

  const entityData = {
    title: <Link to="/pedidos">Pedidos</Link>,
    subTitle: "",
    loadingMessage: "Cargando pedidos...",
    errorMessage: "Error al obtener los pedidos",
    fetchDataHook: usePedidos,
    itemKey: "id", //id_pedido.  Es muy necesario para la tabla el itemKey
    entityFields: productFields,
    actions: [
      {
        to: "/createPedido",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default Pedidos;
