import { useCompras } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit, FaEye } from "react-icons/fa";
import { EntityList, ActionButton } from "../../../components/shared";
import { Link } from "react-router-dom";

function Compras() {
  const campos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editCompra/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/detallesCompra/${item.id}`}
            icon={FaEye}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center p-1"
            title="Ver Detalles"
          />
        </div>
      ),
    },
    {
      key: "nombre_proveedor",
      label: "Proveedor",
    },
    { key: "descuento", label: "Descuento" },
    { key: "total_compra", label: "Total Bs." },
    {
      key: "observaciones",
      label: "Observaciones",
    },
  ];

  const entityData = {
    title: <Link to="/compras">Compras</Link>,
    subTitle: "Para realizar un compra se debe realizar un pedido previo",
    loadingMessage: "Cargando compras...",
    errorMessage: "Error al obtener las compras",
    fetchDataHook: useCompras,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: campos,
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

export default Compras;
