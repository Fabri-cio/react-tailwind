import { useProducts } from "../../hooks/useEntities";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ActionButton } from "@/components/shared/ActionButton";
import EntityList from "@/components/shared/EntityList";
import { FaPlus } from "react-icons/fa";

function ProductList() {
  const productFields = (handleDetallesClick) => [
    { key: "index", label: "#" },
    { key: "nombre", label: "Nombre" },
    { key: "nombre_proveedor", label: "Proveedor" },
    { key: "nombre_categoria", label: "Categoría" },
    {
      key: "precio",
      label: "Precio Bs.",
      render: (item) => item.precio.toFixed(2),
    },
    { key: "codigo_barras", label: "Código" },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
    {
      key: "acciones",
      label: "Acciones",
      render: (item) => (
        <ActionButton
          onClick={() => handleDetallesClick(item.id_producto)}
          label="Editar"
          estilos={
            "bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md flex items-center gap-2 transition duration-200"
          }
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
    editPath: "/editProduct",
    all_data: false,
    entityFields: productFields,
    actions: [
      {
        to: "/createProduct",
        label: "Nuevo producto",
        icon: FaPlus,
        estilos:
          "bg-purple-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
      },
    ],
  };


  return <EntityList entityData={entityData} />;
}

export default ProductList;
