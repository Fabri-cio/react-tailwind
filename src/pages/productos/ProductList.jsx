import { useNavigate } from "react-router-dom";
import useProducts from "@/hooks/useProducts";
import { Navigation } from "@/components/shared/Navigation";
import Table from "@/components/shared/Table";
import { ActionButton } from "@/components/shared/ActionButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Loading from "@/components/shared/Loading";
import ErrorMessage from "@/components/shared/ErrorMessaje";
import Pagination from "@/components/shared/Pagination";
import usePagination from "@/hooks/usePagination";

function ProductList() {
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = usePagination();
  const {
    data: response = {},
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProducts(false, currentPage);

  const productos = response.data?.results || response.data?.data || [];
  const totalProducts = response.data?.count || 0;
  const totalPages = Math.ceil(totalProducts / 10);

  const handleDetallesClick = (producto) => {
    navigate(`/editProduct/${producto.id_producto}`);
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
  if (errorProductos)
    return <ErrorMessage message="Error al obtener los productos" />;

  return (
    <div className="container mx-auto p-4">
      <Navigation
        entityName="Productos"
        listPath="/productList"
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
      {/* Agregar paginación */}
      {!response.all_data && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default ProductList;
