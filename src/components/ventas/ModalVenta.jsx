import React, { useState } from "react";

const ModalVenta = ({ carrito, total, descuentoGlobal, onConfirm, onClose }) => {
  const [descuentoGeneral, setDescuentoGeneral] = useState(descuentoGlobal);

  // Calcular total sin descuento (sumando los subtotales con descuentos individuales)
  const totalSinDescuento = carrito.reduce((acc, item) => {
    const totalProducto = item.precio * item.cantidad - (item.descuento || 0); // Descuentos por producto
    return acc + totalProducto;
  }, 0);

  // Total final después de aplicar el descuento global
  const totalFinal = totalSinDescuento - descuentoGlobal;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-semibold">Confirmación de Venta</h3>

        {/* Sección de productos */}
        <table className="w-full mt-4">
          <thead>
            <tr className="text-center">
              <th>Producto</th>
              <th>Cant.</th>
              <th>Precio Bs.</th>
              <th>Desc. Bs.</th>
              <th>Total Bs.</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {carrito.map((item, index) => (
              <tr key={index}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>{item.precio.toFixed(2)}</td>
                <td>{(item.descuento || 0).toFixed(2)}</td>
                <td>
                  {(
                    item.precio * item.cantidad -
                    (item.descuento || 0)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Resumen de la venta */}
        <div className="mt-4">
          <p>
            <strong>Total sin descuento:</strong> Bs.{" "}
            {totalSinDescuento.toFixed(2)}
          </p>
          <p className="mt-2">
            <strong>Descuento General:</strong> Bs. {descuentoGlobal.toFixed(2)}
          </p>
          <p className="mt-2">
            <strong>Total Final:</strong> Bs. {totalFinal.toFixed(2)}
          </p>
        </div>

        {/* Botones */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => onConfirm(totalFinal, descuentoGeneral)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Confirmar Venta
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVenta;
