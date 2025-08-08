import { useTiposMovimientos } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit, FaHistory } from "react-icons/fa";
import { StatusBadge, EntityList, Image } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function TiposMovimientos() {
  const camposTiposMovimientos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editTipoMovimiento/${item.id}`}
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
    {
      key: "naturaleza",
      label: "Naturaleza",
    },
    { key: "descripcion", label: "Descripción" },
  ];

  const entityData = {
    title: <Link to="/tiposMovimientos">Tipos de Movimientos</Link>,
    subTitle: "",
    loadingMessage: "Cargando tipos de movimientos...",
    errorMessage: "Error al obtener los tipos de movimientos",
    fetchDataHook: useTiposMovimientos,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: camposTiposMovimientos,
    actions: [
      {
        to: "/createTipoMovimiento",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default TiposMovimientos;
