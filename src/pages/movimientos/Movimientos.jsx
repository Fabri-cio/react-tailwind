import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMovimientos } from "../../hooks/useEntities";

function Movimientos() {
  const {
    data: response = {},
    isLoading: loadingMovimientos,
    isError: errorMovimientos,
  } = useMovimientos();

  const movimientos = response.data || [];

  console.log("Movimientos cargados:", movimientos);

  if (loadingMovimientos) return <p className="text-center text-gray-500">Cargando Movimientos...</p>;
  if (errorMovimientos) return <p className="text-center text-red-500">Error: {errorMovimientos}</p>;

  // Agrupar los movimientos por tienda
  const movimientosPorTienda = movimientos.reduce((acc, movimiento) => {
    const tienda = movimiento.nom_alm; // Usamos el nombre del almacén como nombre de la tienda
    if (!acc[tienda]) {
      acc[tienda] = [];
    }
    acc[tienda].push(movimiento);
    return acc;
  }, {});

  const MovimientosFila = ({ movimiento, index }) => {
    const {
      id_movimiento,
      nom_produc,
      nom_alm,
      nom_tip,
      cantidad,
      fecha_creacion,
      nom_user,
    } = movimiento;

    const formatDate = fecha_creacion
      ? format(new Date(fecha_creacion), "dd'/'MMMMMMMMMMM'/'yyyy", {
          locale: es,
        })
      : "Fecha inválida";

    return (
      <tr className="hover:bg-gray-100 transition-colors duration-300">
        <td className="text-center py-3 px-4 border-b border-gray-200">{index + 1}</td>
        <td className="py-3 px-4 border-b border-gray-200">{nom_produc}</td>
        <td className="text-center py-3 px-4 border-b border-gray-200">{nom_alm}</td>
        <td className="text-center py-3 px-4 border-b border-gray-200">{nom_tip}</td>
        <td className="text-center py-3 px-4 border-b border-gray-200">{cantidad}</td>
        <td className="text-center py-3 px-4 border-b border-gray-200">{formatDate}</td>
        <td className="text-center py-3 px-4 border-b border-gray-200">{nom_user}</td>
      </tr>
    );
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      {Object.keys(movimientosPorTienda).map((tienda) => (
        <div key={tienda} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{tienda}</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm text-gray-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">#</th>
                  <th className="border-b border-gray-300 px-6 py-4">Producto</th>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">Almacén</th>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">Tipo</th>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">Cantidad</th>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">Fecha</th>
                  <th className="border-b border-gray-300 px-6 py-4 text-center">Empleado</th>
                </tr>
              </thead>
              <tbody>
                {movimientosPorTienda[tienda].map((movimiento, index) => (
                  <MovimientosFila
                    key={movimiento.id_movimiento || index}
                    movimiento={movimiento}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Movimientos;
