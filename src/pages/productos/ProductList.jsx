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
    title: "Catalogo de Productos",
    subTitle: "",
    loadingMessage: "Cargando productos...",
    errorMessage: "Error al obtener los productos",
    fetchDataHook: useProducts,
    itemKey: "id_producto",
    entityFields: productFields,
    actions: [
      {
        to: "/createProduct",
        icon: FaPlus,
        estilos: "text-white"
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default ProductList;
