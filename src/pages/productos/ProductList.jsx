import { useProducts } from "../../hooks/useEntities";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ActionButton } from "@/components/shared/ActionButton";
import EntityList from "@/components/shared/EntityList";
import { FaPlus, FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductList() {
  const productFields = () => [
    { key: "index", label: "#" },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
    {
      key: "nombre",
      label: "Nombre",
      render: (item) => (
        <Link
          to={`/editProduct/${item.id_producto}`}
          className="text-blue-400 font-bold hover:underline"
        >
          {item.nombre}
        </Link>
      ),
    },
    { key: "nombre_proveedor", label: "Proveedor" },
    { key: "nombre_categoria", label: "Categoría" },
    {
      key: "precio",
      label: "Precio Bs.",
      render: (item) => item.precio.toFixed(2),
    },
    { key: "codigo_barras", label: "Código" },
  ];

  const entityData = {
    title: "Gestión de Productos",
    subTitle: "Listado de productos",
    loadingMessage: "Cargando productos...",
    errorMessage: "Error al obtener los productos",
    fetchDataHook: useProducts,
    all_data: true,
    itemKey: "id_producto",
    entityFields: productFields,
    actions: [
      {
        to: "/createProduct",
        label: "Nuevo producto",
        icon: FaPlus,
        estilos:
          "hover:bg-gray-600 hover:text-white py-2 px-1 text-black border-2 rounded-md border-gray-400 flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaBox,
  };

  return <EntityList entityData={entityData} />;
}

export default ProductList;
