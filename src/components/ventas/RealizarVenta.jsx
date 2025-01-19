import React, { useState, useEffect, useCallback } from "react";
// Importa el componente de búsqueda
import BuscarProducto from "@/components/ventas/BuscarProducto";
import ModalVenta from "./ModalVenta"; // Importa el componente de ModalVenta
import { useCrearVenta } from "../../hooks/useCrearVentas";

const RealizarVenta = () => {
  const [carrito, setCarrito] = useState([]); // Estado del carrito
  const [total, setTotal] = useState(0); // Total de la venta
  const [descuentoVenta, setDescuentoVenta] = useState(0); // Descuento global de la venta
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar si el modal está abierto

  const { mutate: crearVenta, isLoading, isError, error } = useCrearVenta(); // Usamos el hook para crear la venta

  // Función para agregar productos al carrito
  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(
        (item) => item.id_producto === producto.id_producto
      );

      if (existe) {
        // Si el producto ya existe, aumentamos la cantidad
        return prevCarrito.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si el producto no existe, lo agregamos al carrito
        return [...prevCarrito, { ...producto, cantidad: 1, descuento: 0 }];
      }
    });
  }, []);

  // Función para calcular el total de la venta
  useEffect(() => {
    const subtotal = carrito.reduce((acc, item) => {
      const descuentoPorProducto = item.descuento || 0;
      const totalProducto = item.precio * item.cantidad;
      return acc + totalProducto - descuentoPorProducto;
    }, 0);
    // Calcular el total con el descuento global
    setTotal(subtotal - descuentoVenta); // Resta el descuento global al subtotal
  }, [carrito, descuentoVenta]); // Asegúrate de que total se actualice cada vez que cambie el carrito o el descuento global

  // Función para eliminar un producto del carrito
  const eliminarProducto = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  // Función para actualizar el descuento de un producto (con debounce)
  const actualizarDescuento = useCallback((index, descuento) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito];
      nuevoCarrito[index].descuento = parseFloat(descuento || 0);
      return nuevoCarrito;
    });
  }, []);

  // Debounce para evitar múltiples actualizaciones rápidas
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const handleDescuentoChange = (index, value) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito];
      // Si el valor es vacío o no un número válido, asignar 0
      nuevoCarrito[index].descuento = value ? parseFloat(value) : 0;
      return nuevoCarrito;
    });
  };

  const handleCantidadChange = (index, value) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito];
      nuevoCarrito[index].cantidad = Math.max(0, parseInt(value, 10)); // Evita valores negativos
      return nuevoCarrito;
    });
  };

  // Función para actualizar el descuento global de la venta
  const handleDescuentoVentaChange = (e) => {
    setDescuentoVenta(parseFloat(e.target.value || 0));
  };

  const idUsuario = localStorage.getItem("id_usuario");
  console.log(idUsuario);
  const idTienda = localStorage.getItem("id_tienda");

  if (!idUsuario || !idTienda) {
    // Manejar el caso cuando no se encuentren estos valores
    alert("No se pudo encontrar la información del usuario o tienda.");
    return; // Evita continuar con la venta
  }

  // Función para guardar la venta
  const guardarVenta = async () => {
    const ventaData = {
      id_usuario: idUsuario, // ID del usuario autenticado
      id_tienda: idTienda, // ID de la tienda o almacén
      metodo_pago: "Efectivo", // Método de pago (puede ser dinámico)
      descuento: descuentoVenta, // Descuento global
      total_venta: total, // Total de la venta
      detalles: carrito.map((item) => ({
        id_producto: item.id_producto, // Producto ID
        cantidad: item.cantidad, // Cantidad de productos
        precio_unitario: item.precio, // Precio del producto
        descuento_unitario: item.descuento || 0, // Descuento del producto (opcional)
        subtotal: item.precio * item.cantidad - (item.descuento || 0), // Subtotal del producto
      })),
    };

    crearVenta(ventaData);

    console.log(
      "Datos que se enviarán al backend:",
      JSON.stringify(ventaData, null, 2)
    );
    // Verifica que los datos sean correctos

    try {
      // Llamar a la función que usará Axios para enviar los datos
      const response = await crearVenta(ventaData);

      // Revisión del estado de la respuesta
      console.log("Respuesta del servidor:", response);

      // Asumimos que un estado 201 indica éxito
      alert("Venta guardada exitosamente");
      setCarrito([]); // Limpiar el carrito
      setTotal(0); // Reiniciar el total
      setDescuentoVenta(0); // Reiniciar el descuento
    } catch (error) {
      // Manejo de errores: mostrar mensajes claros al usuario
      console.error("Error al guardar la venta:", error);

      if (error.detalles) {
        alert(
          `Error: ${error.message}\nDetalles: ${JSON.stringify(error.detalles)}`
        );
      } else {
        alert("Error al guardar la venta. Verifica tu conexión.");
      }
    }
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]); // Limpia el carrito
    setTotal(0); // Reinicia el total
    setDescuentoVenta(0); // Reinicia el descuento global
  };

  // Función para abrir el modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  // Función para confirmar la venta desde el modal
  const handleConfirmVenta = (totalFinal, descuentoGeneral) => {
    console.log("Total final de la venta:", totalFinal); // Verifica el total final
    guardarVenta(); // Llamar a la función para guardar la venta
    cerrarModal(); // Cierra el modal
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Sección izquierda con búsqueda y carrito */}
      <div className="col-span-3">
        <BuscarProducto agregarAlCarrito={agregarAlCarrito} />
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-2">N°</th>
              <th className="border border-gray-300 p-2">Producto</th>
              <th className="border border-gray-300 p-2">Cant.</th>
              <th className="border border-gray-300 p-2">Precio Bs.</th>
              <th className="border border-gray-300 p-2">Desc. Bs.</th>
              <th className="border border-gray-300 p-2">Total Bs.</th>
              <th className="border border-gray-300 p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.nombre}</td>
                <td className="border text-center border-gray-300 p-2">
                  <input
                    type="number"
                    min="0"
                    value={item.cantidad}
                    onChange={(e) =>
                      handleCantidadChange(index, e.target.value)
                    }
                    className="w-20 border rounded px-2 py-1"
                  />
                </td>
                <td className="border text-center border-gray-300 p-2">
                  {item.precio.toFixed(2)}
                </td>
                <td className="border text-center border-gray-300 p-2">
                  <input
                    placeholder="0.00"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.descuento || ""}
                    onChange={(e) =>
                      handleDescuentoChange(index, e.target.value)
                    }
                    className="w-20 border rounded px-2 py-1"
                  />
                </td>
                <td className="border text-center border-gray-300 p-2">
                  {(
                    item.precio * item.cantidad -
                    (item.descuento || 0)
                  ).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => eliminarProducto(index)}
                    className="text-red-500 hover:underline"
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
            onClick={abrirModal}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h11M9 21V3m-6 7h6"
              />
            </svg>
            Guardar Venta
          </button>
          <button
            onClick={vaciarCarrito}
            className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Vaciar Carrito
          </button>
        </div>
      </div>

      {/* Sección derecha con resumen de venta */}
      <div className="col-span-1 text-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded shadow-md">
        <h2 className="text-lg font-semibold text-blue-600">
          Resumen de Venta
        </h2>
        <div className="mt-2">
          <label htmlFor="descuentoVenta" className="block text-sm">
            Descuento global:
          </label>
          <input
            type="number"
            id="descuentoVenta"
            value={descuentoVenta}
            onChange={handleDescuentoVentaChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Descuento global en $"
          />
        </div>
        <div className="mt-4 p-4 bg-white rounded shadow">
          <p className="font-semibold">
            Total después de descuento:{" "}
            <span className="text-green-600">Bs.{total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Modal de Confirmación de Venta */}
      {isModalOpen && (
        <ModalVenta
          carrito={carrito}
          total={total}
          descuentoGlobal={descuentoVenta}
          onConfirm={handleConfirmVenta}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
};

export default RealizarVenta;
