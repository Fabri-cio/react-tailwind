import React, { useState, useEffect, useCallback } from "react";
import BuscarProducto from "@/components/ventas/BuscarProducto";
import ModalVenta from "./ModalVenta";
import { useVentaMutations } from "../../hooks/useEntities";

const RealizarVenta = () => {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [descuentoVenta, setDescuentoVenta] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { crear } = useVentaMutations();

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(
        (item) => item.id_producto === producto.id_producto
      );
      if (existe) {
        return prevCarrito.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1, descuento: 0 }];
      }
    });
  }, []);

  useEffect(() => {
    const subtotal = carrito.reduce((acc, item) => {
      const descuentoPorProducto = item.descuento || 0;
      const totalProducto = item.precio * item.cantidad;
      return acc + totalProducto - descuentoPorProducto;
    }, 0);
    setTotal(subtotal - descuentoVenta);
  }, [carrito, descuentoVenta]);

  const eliminarProducto = (index) => {
    setCarrito((prevCarrito) => prevCarrito.filter((_, i) => i !== index));
  };

  const handleDescuentoChange = (index, value) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito];
      nuevoCarrito[index].descuento = value ? parseFloat(value) : 0;
      return nuevoCarrito;
    });
  };

  const handleCantidadChange = (index, value) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = [...prevCarrito];
      nuevoCarrito[index].cantidad = Math.max(0, parseInt(value, 10));
      return nuevoCarrito;
    });
  };

  const handleDescuentoVentaChange = (e) => {
    setDescuentoVenta(parseFloat(e.target.value || 0));
  };

  const guardarVenta = async () => {
    const ventaData = {
      id_usuario: localStorage.getItem("id_usuario"),
      id_tienda: localStorage.getItem("id_tienda"),
      metodo_pago: "Efectivo",
      descuento: descuentoVenta,
      total_venta: total,
      detalles: carrito.map((item) => ({
        id_producto: item.id_producto,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        descuento_unitario: item.descuento || 0,
        subtotal: item.precio * item.cantidad - (item.descuento || 0),
      })),
    };

    crear(ventaData);
    setCarrito([]);
    setTotal(0);
    setDescuentoVenta(0);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    setDescuentoVenta(0);
  };

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmVenta = () => {
    guardarVenta();
    cerrarModal();
  };

  return (
    <div className="p-8 space-y-6">
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-6">
        Realizar Venta
      </h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <BuscarProducto agregarAlCarrito={agregarAlCarrito} />
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2">N°</th>
                <th className="p-2">Producto</th>
                <th className="p-2">Cant.</th>
                <th className="p-2">Precio Bs.</th>
                <th className="p-2">Desc. Bs.</th>
                <th className="p-2">Total Bs.</th>
                <th className="p-2">Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.nombre}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleCantidadChange(index, e.target.value)
                      }
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 text-center">{item.precio.toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      value={item.descuento || ""}
                      onChange={(e) =>
                        handleDescuentoChange(index, e.target.value)
                      }
                      className="w-20 p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 text-center">
                    {(
                      item.precio * item.cantidad -
                      (item.descuento || 0)
                    ).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
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
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              Guardar Venta
            </button>
            <button
              onClick={vaciarCarrito}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>

        <div className="col-span-1 bg-blue-100 rounded p-4 shadow-md">
          <h2 className="text-lg font-bold text-blue-600">Resumen</h2>
          <div className="mt-2">
            <label className="block">Descuento global:</label>
            <input
              type="number"
              value={descuentoVenta}
              onChange={handleDescuentoVentaChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4 p-4 bg-white rounded shadow">
            <p className="font-bold text-green-600">
              Total: Bs. {total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
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
