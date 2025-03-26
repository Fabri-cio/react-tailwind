import React from "react";
import { useNavigate } from "react-router-dom";
import { useVentas } from "../../hooks/useEntities";

function Ventas() {
  const {
    data: response = {},
    isLoading: loadingVentas,
    isError: errorVentas,
  } = useVentas();

  const ventas = response.data || [];

  const navigate = useNavigate();

  console.log("Ventas cargadas:", ventas);

  // Manejo de carga y errores
  if (loadingVentas)
    return <p className="text-center text-gray-600">Cargando ventas...</p>;
  if (errorVentas)
    return <p className="text-center text-red-600">Error: {errorVentas}</p>;

  // Agrupar las ventas por tienda
  const ventasPorTienda = ventas.reduce((acc, venta) => {
    const tienda = venta.nombre_tienda;
    if (!acc[tienda]) {
      acc[tienda] = [];
    }
    acc[tienda].push(venta);
    return acc;
  }, {});

  const VentasFila = ({ venta, index }) => {
    const {
      id_venta,
      fecha_venta,
      id_usuario,
      nom_user,
      nombre_tienda,
      metodo_pago,
      descuento,
      total_venta,
    } = venta;

    const handleDetallesClick = () => {
      navigate(`/ventas/detalleVenta/${id_venta}`, { state: { venta } });
    };

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
        <td className="border px-4 py-2 text-center">{nom_user}</td>
        <td className="border px-4 py-2 text-center">{nombre_tienda}</td>
        <td className="border px-4 py-2 text-center">{metodo_pago}</td>
        <td className="border px-4 py-2 text-center text-red-500">
          {descuento}
        </td>
        <td className="border px-4 py-2 text-center font-semibold text-green-600">
          Bs. {total_venta}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">
          <button
            onClick={handleDetallesClick}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Detalles
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Título principal de la sección */}
      <h1 className="text-4xl font-extrabold text-center text-blue-800">
        Ventas
      </h1>
      {Object.entries(ventasPorTienda).map(
        ([tienda, ventasPorUnaTienda], index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
          >
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              {tienda}
            </h3>
            <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-4 py-2 text-center">#</th>
                  <th className="border px-4 py-2 text-center">Fecha Venta</th>
                  <th className="border px-4 py-2 text-center">Cajero</th>
                  <th className="border px-4 py-2 text-center">Tienda</th>
                  <th className="border px-4 py-2 text-center">
                    Método de Pago
                  </th>
                  <th className="border px-4 py-2 text-center">Descuento Bs.</th>
                  <th className="border px-4 py-2 text-center">Total Venta Bs.</th>
                  <th className="border px-4 py-2 text-center">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {ventasPorUnaTienda.map((venta, idx) => (
                  <VentasFila
                    key={venta.id_venta || idx}
                    index={idx + 1}
                    venta={venta}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
}

export default Ventas;
