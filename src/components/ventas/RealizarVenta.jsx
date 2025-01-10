// src/components/RealizarVenta.js

import React, { useState } from "react";
import BuscarProducto from "../../components/ventas/BuscarProducto"; // Importa el componente de búsqueda

const RealizarVenta = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    calcularTotal([...carrito, producto]);
  };

  // Función para calcular el total
  const calcularTotal = (carrito) => {
    const nuevoTotal = carrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Sección izquierda con búsqueda y carrito */}
      <div className="col-span-3">
        <BuscarProducto agregarAlCarrito={agregarAlCarrito} />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Ítem</th>
              <th className="border border-gray-300 p-2">Cantidad</th>
              <th className="border border-gray-300 p-2">Producto</th>
              <th className="border border-gray-300 p-2">Marca</th>
              <th className="border border-gray-300 p-2">Precio</th>
              <th className="border border-gray-300 p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.cantidad}</td>
                <td className="border border-gray-300 p-2">{item.nombre}</td>
                <td className="border border-gray-300 p-2">{item.marca}</td>
                <td className="border border-gray-300 p-2">${item.precio}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => eliminarProducto(index)}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => console.log("Venta Guardada")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar Venta
          </button>
        </div>
      </div>

      {/* Sección derecha con resumen de venta */}
      <div className="col-span-1 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-lg font-semibold">Resumen de Venta</h2>
        <p className="mt-2">Total: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RealizarVenta;
