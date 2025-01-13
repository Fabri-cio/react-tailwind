import React from "react";
import { Link } from "react-router-dom";
import { useVentas } from "@/hooks/useVentas";

function Ventas() {
  const { ventas, loadingVentas, errorVentas } = useVentas();

  console.log("Ventas cargadas:", ventas);

  // Manejo de carga y errores
  if (loadingVentas)
    return <p className="text-center text-gray-600">Cargando ventas...</p>;
  if (errorVentas)
    return <p className="text-center text-red-600">Error: {errorVentas}</p>;

  const VentasFila = ({ venta, index }) => {
    const {
      id_venta,
      fecha_venta,
      id_usuario,
      id_tienda,
      metodo_pago,
      descuento,
      total_venta,
    } = venta;

    return (
      <tr className="hover:bg-gray-100 transition duration-200">
        <td className="border px-4 py-2 text-center">{index}</td>
        <td className="border px-4 py-2 text-center">
          {new Date(fecha_venta).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </td>
        <td className="border px-4 py-2 text-center">{id_usuario}</td>
        <td className="border px-4 py-2 text-center">{id_tienda}</td>
        <td className="border px-4 py-2 text-center">{metodo_pago}</td>
        <td className="border px-4 py-2 text-center text-red-500">
          {descuento}
        </td>
        <td className="border px-4 py-2 text-center font-semibold text-green-600">
          Bs. {total_venta}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          <Link
            to={`/ventas/detalleVenta/${id_venta}`}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Detalles
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-center">#</th>
            <th className="border px-4 py-2 text-center">Fecha Venta</th>
            <th className="border px-4 py-2 text-center">ID Usuario</th>
            <th className="border px-4 py-2 text-center">ID Tienda</th>
            <th className="border px-4 py-2 text-center">Método de Pago</th>
            <th className="border px-4 py-2 text-center">Descuento</th>
            <th className="border px-4 py-2 text-center">Total Venta</th>
            <th className="border px-4 py-2 text-center">Detalles</th>
            {/* Boton ver detalles de la venta */}
            <th className="border px-4 py-2 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <VentasFila
              key={venta.id_venta || index}
              index={index + 1}
              venta={venta}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;
