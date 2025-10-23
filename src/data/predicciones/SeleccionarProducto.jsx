import { useInventariosList } from "../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit, FaSearch } from "react-icons/fa";
import { EntityList, Image, ActionButton } from "../../components/shared";
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
            to={`/detalles-prediccion/${item.id}`}
            icon={() => (
              <span className="relative inline-block w-6 h-6">
                {/* Icono de producto como fondo */}
                <FaBox className="absolute left-0 top-0 text-gray-500 w-6 h-6" />
                {/* Lupa encima, centrada y más pequeña */}
                <FaSearch className="absolute left-1 top-1 text-white w-4 h-4" />
              </span>
            )}
            title="Analizar Producto"
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "imagen",
      label: "Imagen",
      render: (item) => <Image src={item.imagen} alt={item.producto_nombre} />,
    },
    {
      key: "producto_nombre",
      label: "Producto",
    },
    {
      key: "almacen_nombre",
      label: "Almacén",
    },
    {
      key: "stock_minimo",
      label: (
        <div className="bg-red-600 text-white p-2 rounded-md text-center w-24">
          Stock Mínimo
        </div>
      ),
    },
    {
      key: "cantidad",
      label: (
        <div className="bg-green-600 text-white p-2 rounded-md text-center w-24">
          {" "}
          Cantidad Stock
        </div>
      ),
    },
    {
      key: "stock_maximo",
      label: (
        <div className="bg-blue-600 text-white p-2 rounded-md text-center w-24">
          Stock Máximo
        </div>
      ),
    },
  ];

  const entityData = {
    title: <Link to="/inventarios">Inventarios</Link>,
    subTitle: "",
    loadingMessage: "Cargando inventarios...",
    errorMessage: "Error al obtener los inventarios",
    fetchDataHook: useInventariosList,
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
