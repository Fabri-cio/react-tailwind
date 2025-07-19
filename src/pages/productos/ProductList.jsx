import { useProducts } from "../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit, FaHistory } from "react-icons/fa";
import { StatusBadge, EntityList, Image } from "../../components/shared";
import { ActionButton } from "../../components/shared/ActionButton";

function ProductList() {
  const productFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editProduct/${item.id_producto}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
          <ActionButton
            to={`/historialProduct/${item.id_producto}`}
            icon={FaHistory}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
    {
      key: "nombre",
      label: "Nombre",
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
        estilos: "text-white",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default ProductList;
