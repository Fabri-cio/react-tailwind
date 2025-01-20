import React from "react";
import { useInventarios } from "../../hooks/useInventarios";
import { Navigation } from "../../components/inventarios/Navigation";
import { Link } from "react-router-dom";

function InventarioList() {
  const {
    data: response = {},
    isLoading: loadingInventarios,
    isError: errorInventarios,
  } = useInventarios();

  const inventarios = response.data || [];

  console.log("Inventario Cargado:", inventarios);

  if (loadingInventarios) return <p>Cargando Inventario...</p>;
  if (errorInventarios)
    return (
      <p className="text-red-600">
        Error:{" "}
        {errorInventarios.message || "Algo salió mal al cargar el inventario."}
      </p>
    );

  const InventarioFila = ({ inventario, index }) => {
    const {
      id_producto_nombre,
      id_almacen_tienda_nombre,
      cantidad,
      stock_minimo,
      id_inventario,
    } = inventario;

    return (
      <tr>
        <td className="text-center">{index + 1}</td>
        <td>{id_producto_nombre}</td>
        <td className="text-center">{id_almacen_tienda_nombre}</td>
        <td className="text-center">{cantidad}</td>
        <td className="text-center">{stock_minimo}</td>
        <td className="text-center">
              {/* Botón para registrar el movimiento */}
              <Link to={`/registrarMovimiento/${id_inventario}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Registrar Movimiento
                </button>
              </Link>
            </td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Navigation />
      <hr />
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="text-center">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Producto</th>
            <th className="border border-gray-300 px-4 py-2">Lugar</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Stock Minimo</th>
            <th className="border border-gray-300 px-4 py-2">Accion</th>
          </tr>
        </thead>
        <tbody>
          {inventarios.length > 0 ? (
            inventarios.map((inventario, index) => (
              <InventarioFila
                key={inventario.id_inventario || index}
                inventario={inventario}
                index={index}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No hay inventarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventarioList;
