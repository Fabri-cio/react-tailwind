import React from "react";
import { Link } from "react-router-dom";
import { useProductos } from "@/hooks/useProductos";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { Navigation } from "@/components/productos/Navigation";

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
  const {
    proveedores,
    loading: loadingProveedores,
    error: errorProveedores,
  } = useProveedores();

  // Log para verificar los productos y categorías cargados
  console.log("Productos cargados:", productos);
  console.log("Categorías cargadas:", categorias);
  console.log("Proveedores cargados:", proveedores);

  // Manejo de carga y errores
  if (loadingProductos || loadingCategorias || loadingProveedores)
    return <p>Cargando productos, categorías y proveedores...</p>;
  if (errorProductos || errorCategorias || errorProveedores)
    return (
      <p>Error: {errorProductos || errorCategorias || errorProveedores}</p>
    );

  // Mapear las categorías al principio para optimizar el acceso
  const categoriasMap = categorias.reduce((acc, cat) => {
    acc[cat.id_categoria] = cat.nombre_categoria;
    return acc;
  }, {});

  //Mapear los proveedores al principio para optimizar el acceso
  const proveedoresMap = proveedores.reduce((acc, prov) => {
    acc[prov.id_proveedor] = prov.nombre_proveedor;
    return acc;
  }, {});

  console.log("Mapa de proveedores:", proveedoresMap);


  // Obtener el nombre de la categoría
  const getNombreCategoria = (idCategoria) =>
    categoriasMap[idCategoria] || "Sin categoría";

  const getNombreProveedor = (idProveedor) =>
    proveedoresMap[idProveedor] || "Sin proveedor";

  // Componente para una fila de la tabla
  const ProductoRow = ({ producto }) => {
    const {
      id_producto,
      estado,
      nombre,
      precio,
      codigo_barras,
      categoria,
      id_proveedor,
    } = producto;

    return (
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className="py-2 px-4 border-b border-gray-200">{nombre}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {estado ? (
            <span className="text-green-500">✓</span> // Ícono de bien
          ) : (
            <span className="text-red-500">✗</span> // Ícono de mal
          )}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          Bs {parseFloat(precio).toFixed(2)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">{codigo_barras}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {getNombreCategoria(categoria)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          {getNombreProveedor(id_proveedor)}
        </td>
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
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Estado</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Código de Barras
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Proveedor</th>
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
