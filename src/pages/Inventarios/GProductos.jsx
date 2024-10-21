import React from "react";
import { useProductos } from "@/hooks/UseProductos";
import BotonActualizar from "@/components/Inventario/BotonActualizar";
import BotonEliminar from "@/components/Inventario/BotonEliminar";

function GProductos() {
  const { producto, loading, error } = useProductos([]); // Desestructuramos los valores del Hook

  if (loading) {
    return <p>Cargando productos...</p>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>; // Muestra el error si ocurre
  }

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
            <th className="py-2 px-4 border-b border-gray-200">Categoría</th>
            <th className="py-2 px-4 border-b border-gray-200">Cantidad</th>
            <th className="py-2 px-4 border-b border-gray-200">Precio</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
            <th className="py-2 px-4 border-b border-gray-200">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {producto.map((producto) => (
            <tr key={producto.id} className="bg-gray-100 hover:bg-gray-200">
              <td className="py-2 px-4 border-b border-gray-200">
                {producto.nombre}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {producto.categoria.nombre_categoria}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {producto.stock}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                ${producto.precio_venta}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <BotonActualizar productoId={producto.id} />
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <BotonEliminar />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GProductos;
