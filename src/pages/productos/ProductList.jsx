import { useNavigate } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Navigation } from "@/components/shared/Navigation";
import Table from "@/components/shared/Table";
import { ActionButton } from "@/components/shared/ActionButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";

function ProductList() {
  const {
    data: response = {},
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProducts();

  const productos = response.data || [];
  const navigate = useNavigate();

  const handleDetallesClick = (producto) => {
    navigate(`/editProduct/${producto.id_producto}`, { state: { producto } });
  };

  const productFields = [
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
          onClick={() => handleDetallesClick(item)} // Usamos onClick para llamar a la función de detalles
          label="Editar"
          color="blue"
        />
      ),
    },
  ];

  if (loadingProductos) return <Loading message="Cargando productos..." />;
  if (errorProductos) return <ErrorMessage message="Error al cargar productos." />;

  return (
    <div className="container mx-auto p-4">
      <Navigation
        entityName="Productos"
        listPath="/productos"
        subTitle="Listado de productos"
        actions={[
          { to: "/createProduct", label: "Crear Producto", color: "green" },
        ]}
      />
      <hr />
      <Table
        items={productos}
        fields={productFields} // Ahora `Table` se encarga de renderizar las filas
      />
    </div>
  );
}

export default ProductList;
