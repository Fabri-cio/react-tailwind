import { FaSalesforce } from "react-icons/fa";
import { useVentas } from "../../hooks/useEntities";
import EntityList from "../../components/shared/EntityList";
import FormattedDate from "../../components/shared/FormattedDate";
import { Link } from "react-router-dom";

function VentasList() {
  const ventasFields = () => [
    { key: "index", label: "N°" },
    {
      key: "fecha_venta",
      label: "Fecha",
      render: (item) => (
        <Link to={`/ventas/detalleVenta/${item.id_venta}`}>
          {item.fecha_venta}
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
    all_data: true,
    itemKey: "id_venta",
    entityFields: ventasFields,
    clavesBusqueda: ["fecha_venta", "nom_user", "nombre_tienda"],
    icon: FaSalesforce,
  };

  return <EntityList entityData={entityData} />;
}

export default VentasList;
