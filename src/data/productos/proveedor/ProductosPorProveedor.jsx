import { useProductByProveedor } from "../../../hooks/useEntities";
import { useParams } from "react-router-dom";
import {
  Loading,
  Error,
  Navigation,
  Image,
  StatusBadge,
} from "../../../components/shared";
import { FaProductHunt } from "react-icons/fa";

export const ProductosPorProveedor = () => {
  const id = useParams().id;
  const { data, isLoading, error } = useProductByProveedor(id);
  if (isLoading) return <Loading />;
  if (error) return <Error />;
  console.log(data);

  return (
    <div>
      <Navigation
        title={`Proveedor ${data.marca}`}
        subTitle={"Lista de productos"}
        icon={FaProductHunt}
        actions={[
          {
            to: -1,
            label: "Volver",
            estilos:
              "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
          },
        ]}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {data.productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <Image src={producto.imagen} alt={producto.nombre} />
            <h3 className="text-lg font-semibold">{producto.nombre}</h3>
            <p className="text-sm text-gray-600">{producto.categoria}</p>
            <p className="mt-1 font-bold">Bs. {producto.precio}</p>
            <StatusBadge isActive={producto.estado} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPorProveedor;
