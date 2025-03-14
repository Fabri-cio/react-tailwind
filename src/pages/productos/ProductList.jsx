import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import Table from "../../components/shared/Table";
import Loading from "../../components/shared/Loading";
import ErrorMessage from "../../components/shared/ErrorMessaje";
import { Navigation } from "../../components/shared/Navigation";

const Productos = () => {
  const { data: productosData, isLoading, isError } = useProducts();

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
    <div className="container mx-auto p-5 overflow-x-auto">
      <Navigation />
      <Table productos={productos} onDetallesClick={handleDetallesClick} />
    </div>
  );
};

export default Productos;
