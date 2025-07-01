import { useProducts } from "../../hooks/useEntities";
import { FaPlus, FaBox } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StatusBadge, EntityList, Image } from "../../components/shared";

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
    },
    {
      key: "imagen",
      label: "Imagen",
      render: (item) => (
        <Image
          src={item.imagen}
          alt={item.nombre}
          className="rounded-full"
          width="w-20"
          height="h-20"
          fallback="/fallback.png"
        />
      ),
    },
  ];

  const entityData = {
    title: "Gestión de Productos",
    subTitle: "Listado de productos",
    loadingMessage: "Cargando productos...",
    errorMessage: "Error al obtener los productos",
    fetchDataHook: useProducts,
    itemKey: "id_producto",
    entityFields: productFields,
    actions: [
      {
        to: "/createProduct",
        label: "Nuevo producto",
        icon: FaPlus,
        estilos:
          "border-gray-400 rounded-lg border-2 p-1 text-green-600 hover:bg-green-600 hover:text-white flex items-center gap-2 transition duration-200",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default ProductList;
