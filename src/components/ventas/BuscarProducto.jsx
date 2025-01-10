// src/components/BuscarProducto.js

import React, { useState, useEffect } from "react";
import { useProductos } from "../../hooks/useProductos"; // Hook que trae los productos desde la API

const BuscarProducto = ({ agregarAlCarrito }) => {
  const [query, setQuery] = useState(""); // Estado para el texto del input
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados
  const { productos, loading, error } = useProductos(); // Traemos los productos

  // Manejo del cambio en el campo de búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      // Filtramos los productos según el nombre que contiene la búsqueda
      const filtered = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(value.toLowerCase())
      );
      setProductosFiltrados(filtered);
    } else {
      setProductosFiltrados([]); // Limpiamos los resultados si el campo está vacío
    }
  };

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
      {loading && <p>Buscando...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {/* Mostrar los productos filtrados */}
      {productosFiltrados.length > 0 && (
        <ul className="border border-gray-300 rounded mt-2 max-h-60 overflow-y-auto">
          {productosFiltrados.map((producto) => (
            <li
              key={producto.id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => agregarAlCarrito(producto)}  // Al hacer click agregamos al carrito
            >
              {producto.nombre} - ${producto.precio}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscarProducto;
