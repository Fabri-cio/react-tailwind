import React, { useState } from "react";

function RealizarVenta() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  const agregarProducto = (producto) => {
    setCarrito([...carrito, producto]);
    calcularTotal([...carrito, producto]);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const calcularTotal = (carrito) => {
    const total = carrito.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );
    setTotal(total);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
  };

  const guardarVenta = () => {
    // Lógica para guardar la venta
    console.log("Venta guardada:", carrito);
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Sección Izquierda */}
      <div className="col-span-3">
        <input
          type="text"
          placeholder="Buscar producto por código de barras"
          className="w-full p-2 mb-4 border rounded"
        />
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
                <td className="border border-gray-300 p-2">{item.precio}</td>
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
            onClick={guardarVenta}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar Venta
          </button>
          <button
            onClick={vaciarCarrito}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>

      {/* Sección Derecha */}
      <div className="col-span-1 p-4 bg-gray-100 rounded shadow">
        <h2 className="text-lg font-semibold">Resumen de Venta</h2>
        <p className="mt-2">Total: ${total.toFixed(2)}</p>
        {/* Más detalles si es necesario */}
      </div>
    </div>
  );
}

export default RealizarVenta;
