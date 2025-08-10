import { useCompras } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { StatusBadge, EntityList, Image } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
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
    subTitle: "",
    loadingMessage: "Cargando compras...",
    errorMessage: "Error al obtener las compras",
    fetchDataHook: useCompras,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: campos,
    actions: [
      {
        to: "/createCompra",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default Compras;
