import { FaSalesforce } from "react-icons/fa";
import { useVentas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import { Link } from "react-router-dom";
import { ActionButton } from "../../../components/shared/ActionButton";
import { FaEye } from "react-icons/fa";

function Ventas() {
  const ventasFields = () => [
    { key: "index", label: "N°" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/ventas/detallesVenta/${item.id}`}
            icon={FaEye}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center p-1"
            title="Ver Detalles"
          />
        </div>
      ),
    },
    {
      key: "fecha_venta",
      label: "Fecha",
      render: (item) => (
        <FormattedDate date={item.fecha_creacion} showWeekday />
      ),
    },
    { key: "usuario_creacion", label: "Cajero" },
    { key: "nombre_tienda", label: "Tienda" },
    { key: "metodo_pago", label: "Pago" },
  ];

  const entityData = {
    title: "Gestion de Ventas",
    subTitle: "Listado de Ventas",
    loadingMessage: "Cargando ventas...",
    errorMessage: "Error al obtener ventas",
    fetchDataHook: useVentas,
    all_data: false,
    itemKey: "id",
    entityFields: ventasFields,
    icon: FaSalesforce,
  };

  return <EntityList entityData={entityData} />;
}

export default Ventas;
