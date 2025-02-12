import React from "react";
import { useLocation } from "react-router-dom";

function DetallesVenta() {
  const { state } = useLocation(); // Recibe los datos de la venta desde la navegación
  const venta = state?.venta;

  if (!venta)
    return (
      <p className="text-center text-xl text-red-600">
        No se proporcionaron datos de la venta.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Detalles de la Venta
      </h1>
      {venta ? (
        <div className="space-y-6">
          {/* Información general de la venta */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-800">
              <strong>N° Venta: </strong> {venta.id_venta}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Fecha:</strong>{" "}
              {new Date(venta.fecha_venta).toLocaleString()}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Usuario:</strong> {venta.nom_user}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Tienda:</strong> {venta.nombre_tienda}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Método de Pago:</strong> {venta.metodo_pago}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <strong>Total Venta:</strong> Bs. {venta.total_venta}
            </p>
          </div>

          {/* Detalles de los productos */}
          <h2 className="text-3xl font-semibold text-indigo-600">
            Detalles de la Venta
          </h2>
          {venta.detalles && venta.detalles.length > 0 ? (
            <table className="min-w-full table-auto bg-white rounded-lg shadow-md border-separate border-spacing-0">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="py-3 px-6 text-left rounded-tl-lg">#</th>
                  <th className="py-3 px-6 text-left">Producto</th>
                  <th className="py-3 px-6 text-left">Cantidad</th>
                  <th className="py-3 px-6 text-left">Precio Bs.</th>
                  <th className="py-3 px-6 text-left">Descuento Bs.</th>
                  <th className="py-3 px-6 text-left rounded-tr-lg">
                    Subtotal Bs.
                  </th>
                </tr>
              </thead>
              <tbody>
                {venta.detalles.map((detalle, index) => (
                  <tr key={index} className="hover:bg-indigo-50">
                    <td className="py-2 px-6 border-b">{index + 1}</td>
                    <td className="py-2 px-6 border-b text-indigo-700">
                      {detalle.nombre_producto}
                    </td>
                    <td className="py-2 px-6 border-b">{detalle.cantidad}</td>
                    <td className="py-2 px-6 border-b">
                      {detalle.precio_unitario}
                    </td>
                    <td className="py-2 px-6 border-b">
                      {detalle.descuento_unitario}
                    </td>
                    <td className="py-2 px-6 border-b text-green-600">
                      {detalle.subtotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-xl text-gray-600">
              No hay detalles para esta venta.
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">
          No se encontraron datos de la venta.
        </p>
      )}
    </div>
  );
}

export default DetallesVenta;
