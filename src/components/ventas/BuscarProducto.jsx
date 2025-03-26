import React, { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useEntities"; // Hook que trae los productos desde la API

const BuscarProducto = ({ agregarAlCarrito }) => {
  const [query, setQuery] = useState(""); // Estado para el texto del input
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados
  const { data: productos = {}, loading, error } = useProducts(); // Traemos los productos
  console.log(productos); // Asegúrate de que los productos son correctos

  const productosData = productos.data?.results || productos.data?.data || [];

  // Manejo del cambio en el campo de búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      // Filtramos los productos según el nombre que contiene la búsqueda
      const filtered = productosData.filter((producto) =>
        producto.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setProductosFiltrados(filtered);
    } else {
      setProductosFiltrados([]); // Limpiamos los resultados si el campo está vacío
    }
  };

  // Función para manejar la selección de un producto
  const handleSelectProduct = (producto) => {
    console.log(producto);
    agregarAlCarrito(producto); // Agregar el producto al carrito
    setQuery(""); // Limpiar el campo de búsqueda
    setProductosFiltrados([]); // Limpiar la lista de sugerencias
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar productos: {error}</p>;
  }

  // Mostrar sugerencias de productos a medida que escribimos
  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto por nombre"
        className="w-full p-2 mb-4 border rounded"
        value={query} // Vinculamos el estado del input
        onChange={handleSearch} // Actualizamos el estado de la búsqueda
      />

      {/* Contenedor para las sugerencias de búsqueda */}
      <div className="relative">
        {/* Mostrar los productos filtrados */}
        {productosFiltrados.length > 0 && (
          <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
            {productosFiltrados.map((producto, index) => {
              const key = producto.id ? producto.id : `producto-${index}`; // Verificamos si el id es válido
              return (
                <li
                  key={key} // Usamos el id o una clave alternativa
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectProduct(producto)} // Al hacer click agregamos al carrito
                >
                  {producto.nombre} - ${producto.precio}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuscarProducto;
