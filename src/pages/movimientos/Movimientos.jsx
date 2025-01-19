import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useMovimientos } from "../../hooks/useMovimientos";

function Movimientos() {
  const {
    data: response = {},
    isLoading: loadingMovimientos,
    isError: errorMovimientos,
  } = useMovimientos();

  const movimientos = response.data || [];

  console.log("Movimientos cargados:", movimientos);

  if (loadingMovimientos) return <p>Cargando Movimientos...</p>;
  if (errorMovimientos) return <p>Error: {errorMovimientos}</p>;

  const MovimientosFila = ({ movimientos, index }) => {
    const {
      id_movimiento,
      nom_produc,
      nom_alm,
      nom_tip,
      cantidad,
      fecha_creacion,
      nom_user,
    } = movimientos;

    const formatDate = fecha_creacion
      ? format(new Date(fecha_creacion), "dd'/'MMMMMMMMMMM'/'yyyy", {
          locale: es,
        })
      : "Fecha inválida";

    return (
      <tr>
        <td className="text-center">{index + 1}</td>
        <td>{nom_produc}</td>
        <td className="text-center">{nom_alm}</td>
        <td className="text-center">{nom_tip}</td>
        <td className="text-center">{cantidad}</td>
        <td className="text-center">{fecha_creacion}</td>
        <td className="text-center">{nom_user}</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="text-center">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Almacen</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Empleado</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento, index) => (
            <MovimientosFila
              key={movimiento.id_movimiento || index}
              movimientos={movimiento}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movimientos;
