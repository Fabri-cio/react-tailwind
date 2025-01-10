import React, { useState, useEffect } from "react";
import BuscarProducto from "../../components/ventas/BuscarProducto"; // Importa el componente de búsqueda

const RealizarVenta = () => {
  const [carrito, setCarrito] = useState([]); // Estado del carrito
  const [total, setTotal] = useState(0); // Total de la venta

  // Función para agregar productos al carrito
  const agregarAlCarrito = (producto) => {
    console.log(carrito); // Verifica el estado del carrito antes de actualizarlo
    // Verificamos si el producto ya existe en el carrito
    const existe = carrito.find((item) => item.id_producto === producto.id_producto);

    if (existe) {
      // Si el producto ya existe, aumentamos la cantidad
      setCarrito(
        carrito.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 } // Aumentamos la cantidad del producto
            : item
        )
      );
    } else {
      // Si el producto no existe, lo agregamos al carrito como un nuevo producto
      setCarrito((prevCarrito) => [
        ...prevCarrito,
        { ...producto, cantidad: 1 },
      ]);
    }
  };

  // Función para calcular el total
  const calcularTotal = () => {
    if (Array.isArray(carrito) && carrito.length > 0) {
      const nuevoTotal = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
      );
      setTotal(nuevoTotal);
    } else {
      setTotal(0);
    }
  };

  // Llamamos a la función calcularTotal cada vez que el carrito cambie
  useEffect(() => {
    calcularTotal();
  }, [carrito]);

  // Función para eliminar un producto del carrito
  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index); // Eliminamos el producto en el índice indicado
    setCarrito(nuevoCarrito); // Actualizamos el carrito
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Sección izquierda con búsqueda y carrito */}
      <div className="col-span-3">
        <BuscarProducto agregarAlCarrito={agregarAlCarrito} />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">N°</th>
              <th className="border border-gray-300 p-2">Producto</th>
              <th className="border border-gray-300 p-2">Cant.</th>
              <th className="border border-gray-300 p-2">Precio</th>
              <th className="border border-gray-300 p-2">Desc.</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.nombre}</td>
                <td className="border border-gray-300 p-2">{item.cantidad}</td>
                <td className="border border-gray-300 p-2">${item.precio}</td>
                <td className="border border-gray-300 p-2">descuento</td>
                <td className="border border-gray-300 p-2">Total</td>
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
