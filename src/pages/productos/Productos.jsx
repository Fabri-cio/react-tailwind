import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";
import { Navigation } from "@/components/productos/Navigation";

function Productos() {
  const {
    data: response = {},
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProductos();

  const productos = response.data || [];

  const navigate = useNavigate();

  // Log para debug
  console.log("Productos cargados:", productos);

  // Manejo de carga y errores
  if (loadingProductos)
    return <p className="text-center text-gray-600">Cargando ventas...</p>;
  if (errorProductos)
    return <p className="text-center text-red-600">Error: {errorProductos}</p>;

  // Componente para una fila de la tabla
  const ProductoFila = ({ producto, index }) => {
    const {
      id_producto,
      estado,
      nombre,
      precio,
      codigo_barras,
      nombre_proveedor,
      nombre_categoria,
    } = producto;

    const handleDetallesClick = () => {
      navigate(`/formProducto/${id_producto}`, { state: { producto } });
    };

    return (
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className="py-2 px-4 border-b border-gray-200">{index}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {estado ? (
            <span className="text-green-500">✓</span>
          ) : (
            <span className="text-red-500">✗</span>
          )}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">{nombre}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {nombre_proveedor}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          {nombre_categoria}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">{precio}</td>
        <td className="py-2 px-4 border-b border-gray-200">{codigo_barras}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          <button
            onClick={handleDetallesClick}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Editar
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">#</th>
            <th className="py-2 px-4 border-b border-gray-200">Estado</th>
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Proveedor</th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">Código</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <ProductoFila
              key={producto.id_producto}
              producto={producto}
              index={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
