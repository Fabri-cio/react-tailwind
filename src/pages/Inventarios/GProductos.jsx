import React from "react";
import { useProductos } from "@/hooks/UseProductos";
import { useCategorias } from "@/hooks/useCategorias";
import BotonActualizar from "@/components/Inventario/BotonActualizar";
import BotonEliminar from "@/components/Inventario/BotonEliminar";
import BotonCrear from "@/components/Inventario/BotonCrear";

function GProductos() {
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

  // Comprobación de carga y errores
  if (loadingProductos || loadingCategorias) {
    return <p>Cargando productos y categorías...</p>;
  }

  if (errorProductos || errorCategorias) {
    return <p>Error al cargar: {errorProductos || errorCategorias}</p>;
  }

  // Función para obtener el nombre de la categoría a partir de su ID
  const getNombreCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find(
      (cat) => cat.id_categoria === idCategoria
    );
    return categoriaEncontrada
      ? categoriaEncontrada.nombre_categoria
      : "Sin categoría";
  };

  return (
    <div className="container mx-auto p-4">
      <BotonCrear />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Descripción</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">
              Cantidad en Stock
            </th>
            <th className="py-2 px-4 border-b border-gray-200">
              Unidad de Medida
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
            <th className="py-2 px-4 border-b border-gray-200">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr
              key={prod.id_producto}
              className="bg-gray-100 hover:bg-gray-200"
            >
              <td className="py-2 px-4 border-b border-gray-200">
                {prod.nombre}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {prod.descripcion}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${prod.precio}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {prod.cantidad_stock}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {prod.unidad_medida}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {getNombreCategoria(prod.categoria)}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <BotonActualizar productoId={prod.id_producto} />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <BotonEliminar productoId={prod.id_producto} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GProductos;
