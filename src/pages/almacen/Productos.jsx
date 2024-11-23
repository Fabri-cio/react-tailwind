import React from "react";
import { Link } from "react-router-dom";
import { useProductos } from "@/hooks/useProductos";
import { useCategorias } from "@/hooks/useCategorias";
import { Navigation } from "@/components/almacen/Navigation";

function Productos() {
  const {
    productos,
    loading: loadingProductos,
    error: errorProductos,
  } = useProductos();
  const {
    categorias,
    loading: loadingCategorias,
    error: errorCategorias,
  } = useCategorias();

  // Manejo de carga y errores
  if (loadingProductos || loadingCategorias)
    return <p>Cargando productos y categorías...</p>;
  if (errorProductos || errorCategorias)
    return <p>Error: {errorProductos || errorCategorias}</p>;

  // Mapear las categorías al principio para optimizar el acceso
  const categoriasMap = categorias.reduce((acc, cat) => {
    acc[cat.id_categoria] = cat.nombre_categoria;
    return acc;
  }, {});

  // Obtener el nombre de la categoría
  const getNombreCategoria = (idCategoria) =>
    categoriasMap[idCategoria] || "Sin categoría";

  // Componente para una fila de la tabla
  const ProductoRow = ({ producto }) => {
    const {
      id_producto,
      nombre,
      marca,
      precio,
      stock,
      codigo_barras,
      categoria,
    } = producto;

    return (
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className="py-2 px-4 border-b border-gray-200">{nombre}</td>
        <td className="py-2 px-4 border-b border-gray-200">{marca}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          Bs {parseFloat(precio).toFixed(2)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">{stock}</td>
        <td className="py-2 px-4 border-b border-gray-200">{codigo_barras}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {getNombreCategoria(categoria)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          <Link
            to={`/almacen/formProducto?id=${id_producto}`}
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
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Marca</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">Stock</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Código de Barras
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoRow key={producto.id_producto} producto={producto} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
