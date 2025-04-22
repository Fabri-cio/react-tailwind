import { FaCartPlus } from "react-icons/fa";
import { useDetaVentas } from "../../hooks/useEntities";
import EntityList from "../../components/shared/EntityList";

function DetalleVentasList() {
  const detalleVentasFields = () => [
    {key:"index", label:"N°"},
    {key:"nombre_producto", label:"Producto"},
    {key:"fecha_venta", label:"Fecha"},
    {key:"cantidad", label:"Cantidad"},
    {key:"precio_unitario", label:"Precio Bs"},
    {key:"descuento_unitario", label:"Descuento Bs."},
    {key:"subtotal", label:"Total Bs."},
  ];

  const entityData = {
    title: "Productos Vendidos",
    subTitle: "Listado de Ventas",
    loadingMessage: "Cargando ventas...",
    errorMessage: "Error al obtener ventas",
    fetchDataHook: useDetaVentas,
    all_data: true,
    itemKey: "id_detalle_venta",
    entityFields: detalleVentasFields,
    clavesBusqueda: ["nombre_producto", "fecha_venta"],
    icon: FaCartPlus,
  };

  return <EntityList entityData={entityData} />;
}

export default DetalleVentasList;
