import { FaTruckMoving } from "react-icons/fa";
import EntityList from "../../components/shared/EntityList";
import { useMovimientosList } from "../../hooks/useEntities";

function MovimientosList() {
  const movimientosFields = () => [
    { key: "index", label: "N°" },
    { key: "nom_produc", label: "Producto" },
    { key: "nom_alm", label: "Almacén" },
    { key: "nom_tipo", label: "Tipo" },
    { key: "cantidad", label: "Cantidad" },
    { key: "fecha_creacion", label: "Fecha" },
    { key: "nom_user", label: "Cajero" },
  ];

  const entityData = {
    title: "Movimientos de Stock",
    subTitle: "Listado de Movimientos",
    loadingMessage: "Cargando movimientos...",
    errorMessage: "Error al obtener movimientos",
    fetchDataHook: useMovimientosList,
    all_data: false,
    itemKey: "id_movimiento",
    entityFields: movimientosFields,
    clavesBusqueda: ["nom_produc", "nom_alm", "nom_tipo", "nom_user"],
    icon: FaTruckMoving,
  };
  return <EntityList entityData={entityData} />;
}

export default MovimientosList;
