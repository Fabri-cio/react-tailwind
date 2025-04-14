import { FaBox, FaFilePdf, FaPlus } from "react-icons/fa";
import EntityList from "../../components/shared/EntityList";
import { useInventarios } from "../../hooks/useEntities";
import { lazy } from "react";
export default function InventarioList() {
  const inventarioCampos = () => [
    { key: "index", label: "N°." },
    { key: "id_producto_nombre", label: "Producto" },
    { key: "cantidad", label: "Stock" },
    { key: "stock_minimo", label: "Stock Min." },
    { key: "id_almacen_tienda_nombre", label: "Tienda/Almacén" },
  ];

  const datosEntidad = {
    title: "Gestion de Inventarios",
    subTitle: "Listado de inventarios",
    loadingMessage: "Cargando inventario...",
    errorMessage: "Error al obtener inventario",
    fetchDataHook: useInventarios,
    all_data: true,
    itemKey: "id_inventario",
    entityFields: inventarioCampos,
    actions: [
      {
        to: "/createInventario",
        label: "Nuevo Inventario",
        icon: FaPlus,
        estilos:
          "border-gray-400 rounded-lg border-2 p-1 text-green-600 hover:bg-green-600 hover:text-white flex items-center gap-2 transition duration-200",
      },
      {
        to: "/generarReporte",
        label: "Generar Reporte",
        icon: FaFilePdf,
        estilos:
          "border-gray-400 rounded-lg border-2 p-1 text-red-600 hover:bg-red-600 hover:text-white flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaBox,
  };

  return <EntityList entityData={datosEntidad} />;
}
