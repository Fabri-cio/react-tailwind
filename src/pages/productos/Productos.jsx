import React from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../../hooks/useProductos";
import { Navigation } from "@/components/productos/Navigation";

function Productos() {
  const {
    data: response = {},
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProductos();

  const productos = response.data || [];

  // Log para debug
  console.log("Productos cargados:", productos);

  // Manejo de carga y errores
  if (loadingProductos) return <p>Cargando productos...</p>;
  if (errorProductos)
    return (
      <p>
        Error al cargar los productos: {error.message || "Error desconocido"}
      </p>
    );

  // Componente para una fila de la tabla
  const ProductoRow = ({ producto, index }) => {
    const {
      id_producto,
      estado,
      nombre,
      precio,
      codigo_barras,
      nombre_proveedor,
      nombre_categoria,
    } = producto;

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
          <Link
            to={`/formProducto?id=${id_producto}`}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Editar
          </Link>
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
            <ProductoRow
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
