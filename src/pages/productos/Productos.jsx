import { useProductos } from "../../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import Table from "../../components/productos/productos/Table";
import Loading from "../../components/productos/Loading";
import ErrorMessage from "../../components/productos/ErrorMessaje";
import { Navigation } from "../../components/productos/Navigation";

const Productos = () => {
  const { data: productosData, isLoading, isError } = useProductos();

  // Verifica que productosData sea un arreglo antes de pasarlo a Table
  const productos = Array.isArray(productosData?.data)
    ? productosData.data
    : [];
  const navigate = useNavigate();

  const handleDetallesClick = (id_producto, producto) => {
    // Aquí puedes navegar o hacer cualquier acción al hacer clic en "Editar"
    console.log(id_producto, producto);
    navigate(`/editProduct/${id_producto}`, { state: { producto } });
  };

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="container mx-auto p-6">
      <Navigation />
      <Table productos={productos} onDetallesClick={handleDetallesClick} />
    </div>
  );
};

export default Productos;
