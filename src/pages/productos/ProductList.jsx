import { useProducts } from "../../hooks/useEntities";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ActionButton } from "@/components/shared/ActionButton";
import EntityList from "@/components/shared/EntityList";

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
          color="blue"
        />
      ),
    },
  ];

  const entityData = {
    title: "Gestión de Productos",
    subTitle: "Listado de productos",
    listPath: "/home",
    createPath: "/createProduct",
    loadingMessage: "Cargando productos...",
    errorMessage: "Error al obtener los productos",
    titleBtn: "Crear Producto",
    fetchDataHook: useProducts,
    editPath: "/editProduct",
    all_data: false,
    entityFields: productFields,
  };

  return <EntityList entityData={entityData} />;
}

export default ProductList;
