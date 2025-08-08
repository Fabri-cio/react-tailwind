import { useInventarios } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { StatusBadge, EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function InventarioList() {
  const inventarioCampos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editInventario/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "producto_nombre",
      label: "Producto",
    },
    {
      key: "almacen_nombre",
      label: "Almacén",
    },
    { key: "stock_minimo", label: <div className="bg-red-600 text-white p-2 rounded-md text-center w-24">Stock Mínimo</div> },
    { key: "cantidad", label: <div className="bg-green-600 text-white p-2 rounded-md text-center w-24"> Cantidad Stock</div> },
    { key: "stock_maximo", label: <div className="bg-blue-600 text-white p-2 rounded-md text-center w-24">Stock Máximo</div> },
  ];

  const entityData = {
    title: <Link to="/inventarios">Inventarios</Link>,
    subTitle: "",
    loadingMessage: "Cargando inventarios...",
    errorMessage: "Error al obtener los inventarios",
    fetchDataHook: useInventarios,
    itemKey: "id", //id_inventario.  Es muy necesario para la tabla el itemKey
    entityFields: inventarioCampos,
    actions: [
      {
        to: "/createInventario",
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

export default InventarioList;
