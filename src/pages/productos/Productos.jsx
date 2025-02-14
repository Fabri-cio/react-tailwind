import React from "react";
import { useNavigate } from "react-router-dom";
import { useProductos } from "@/hooks/useProductos";
import { Navigation } from "@/components/productos/Navigation";

function Productos() {
  const {
    data: response = {},
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProductos();

  const productos = response.data || [];
  const navigate = useNavigate();

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
      <tr className="hover:bg-gray-100 transition-all">
        <td className="py-3 px-4 text-gray-700 text-center">{index}</td>
        <td className="py-3 px-4 text-center">
          {estado ? (
            <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">
              Activo
            </span>
          ) : (
            <span className="inline-block bg-red-200 text-red-700 px-2 py-1 rounded-full text-sm">
              Inactivo
            </span>
          )}
        </td>
        <td className="py-3 px-4">{nombre}</td>
        <td className="py-3 px-4">{nombre_proveedor}</td>
        <td className="py-3 px-4">{nombre_categoria}</td>
        <td className="py-3 px-4 text-right">{precio.toFixed(2)}</td>
        <td className="py-3 px-4">{codigo_barras}</td>
        <td className="py-3 px-4 text-center">
          <button
            onClick={handleDetallesClick}
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all"
          >
            Editar
          </button>
        </td>
      </tr>
    );
  };

  if (loadingProductos)
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  if (errorProductos)
    return (
      <p className="text-center text-red-600">Error al cargar productos.</p>
    );

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <hr />
      <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              #
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Estado
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Nombre
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Proveedor
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Categoría
            </th>
            <th className="py-3 px-4 text-right font-semibold text-gray-700 border-b">
              Precio Bs.
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
              Código
            </th>
            <th className="py-3 px-4 text-center font-semibold text-gray-700 border-b">
              Acciones
            </th>
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
