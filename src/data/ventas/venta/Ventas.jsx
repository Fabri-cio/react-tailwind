import { FaSalesforce } from "react-icons/fa";
import { useVentas } from "../../../hooks/useEntities";
import EntityList from "../../../components/shared/EntityList";
import FormattedDate from "../../../components/shared/FormattedDate";
import { Link } from "react-router-dom";

function Ventas() {
  const ventasFields = () => [
    { key: "index", label: "N°" },
    {
      key: "fecha_venta",
      label: "Fecha",
      render: (item) => (
        <Link to={`/ventas/detallesVenta/${item.id_venta}`}>
          <FormattedDate date={item.fecha_venta} />
        </Link>
      ),
    },
    { key: "nom_user", label: "Cajero" },
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
    itemKey: "id_venta",
    entityFields: ventasFields,
    icon: FaSalesforce,
  };

  return <EntityList entityData={entityData} />;
}

export default Ventas;
