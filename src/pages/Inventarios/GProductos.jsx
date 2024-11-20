import React, { useState } from "react";
import { useProductos } from "@/hooks/UseProductos";
import { useCategorias } from "@/hooks/useCategorias";
import BotonEliminar from "@/components/Inventario/BotonEliminar";
import FormProducto from "@/components/Inventario/FormProducto"; // Asegúrate de importar el formulario
import { Navigation } from "../../components/Inventario/Navigation";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductoId, setSelectedProductoId] = useState(null); // Producto para editar

  // Maneja la apertura del modal
  const openModal = (productoId = null) => {
    setSelectedProductoId(productoId); // Si productoId es null, es para crear un nuevo producto
    setModalOpen(true);
  };

  // Maneja el cierre del modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProductoId(null); // Resetea el producto seleccionado
  };

  // Carga y errores
  if (loadingProductos || loadingCategorias)
    return <p>Cargando productos y categorías...</p>;
  if (errorProductos || errorCategorias)
    return <p>Error: {errorProductos || errorCategorias}</p>;

  // Obtener el nombre de la categoría
  const getNombreCategoria = (idCategoria) => {
    const categoria = categorias.find(
      (cat) => cat.id_categoria === idCategoria
    );
    return categoria ? categoria.nombre_categoria : "Sin categoría";
  };

  // Componente para una fila de la tabla
  const ProductoRow = ({ producto }) => {
    const {
      id_producto,
      nombre,
      descripcion,
      precio,
      cantidad_stock,
      unidad_medida,
      categoria,
    } = producto;

    return (
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className="py-2 px-4 border-b border-gray-200">{nombre}</td>
        <td className="py-2 px-4 border-b border-gray-200">{descripcion}</td>
        <td className="py-2 px-4 border-b border-gray-200">${precio}</td>
        <td className="py-2 px-4 border-b border-gray-200">{cantidad_stock}</td>
        <td className="py-2 px-4 border-b border-gray-200">{unidad_medida}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {getNombreCategoria(categoria)}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          <button
            onClick={() => openModal(id_producto)} // Abre el modal para editar el producto
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Editar
          </button>
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          <BotonEliminar productoId={id_producto} />
        </td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />

      {/* Modal para crear o actualizar productos */}
      {modalOpen && (
        <FormProducto
          productoId={selectedProductoId} // Pasamos el ID del producto a editar (o null para crear)
          onClose={closeModal} // Función para cerrar el modal
        />
      )}

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
          {productos.map((producto) => (
            <ProductoRow key={producto.id_producto} producto={producto} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GProductos;
