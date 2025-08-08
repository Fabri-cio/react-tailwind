import { useMovimientos } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { EntityList, FormattedDate } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function Movimientos() {
  const campos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editMovimiento/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "cantidad",
      label: "Cantidad",
    },
    {
      key: "producto_nombre",
      label: "Producto",
    },
    { key: "almacen_nombre", label: "Almacen" },
    { key: "tipo_nombre", label: "Tipo" },
    {
      key: "fecha_creacion",
      label: "Fecha", render:(item)=><FormattedDate date={item.fecha_creacion} />
    },
  ];

  const entityData = {
    title: <Link to="/movimientos">Movimientos en el Inventario</Link>,
    subTitle: "",
    loadingMessage: "Cargando movimientos...",
    errorMessage: "Error al obtener los movimientos",
    fetchDataHook: useMovimientos,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: campos,
    actions: [
      {
        to: "/createMovimiento",
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

export default Movimientos;
