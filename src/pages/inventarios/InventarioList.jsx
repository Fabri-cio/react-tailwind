import React from "react";
import { useInventarios } from "../../hooks/useInventarios";
import { useNavigate } from "react-router-dom";

function Inventarios() {
  const {
    data: response = {},
    isLoading: loadingInventarios,
    isError: errorInventarios,
  } = useInventarios();

  const inventarios = response.data || [];

  const navigate = useNavigate();

  // Manejo de carga y errores
  if (loadingInventarios)
    return <p className="text-center text-gray-600">Cargando inventarios...</p>;
  if (errorInventarios)
    return <p className="text-center text-red-600">Error: {errorInventarios}</p>;

  const InventarioFila = ({ inventario, index }) => {
    const {
      id_inventario,
      id_producto_nombre,
      id_almacen_tienda_nombre,
      cantidad,
      stock_minimo,
    } = inventario;

    const handleDetallesClick = () => {
      navigate(`/registrarMovimiento/${id_inventario}`, { state: { inventario } });
    };

    // Determina la clase para la cantidad según la condición
    const cantidadClase =
      cantidad <= stock_minimo ? "text-red-600 font-bold" : "text-green-600 font-bold";

    return (
      <tr className="hover:bg-gray-100 transition duration-200">
        <td className="border px-4 py-2 text-center">{index}</td>
        <td className="border px-4 py-2 text-center">{id_producto_nombre || "Producto no disponible"}</td>
        <td className="border px-4 py-2 text-center">{id_almacen_tienda_nombre || "Almacén no disponible"}</td>
        <td className={`border px-4 py-2 text-center ${cantidadClase}`}>
          {cantidad ?? "0"}
        </td>
        <td className="border px-4 py-2 text-center">{stock_minimo ?? "0"}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          <button
            onClick={handleDetallesClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Registrar Movimiento
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-center">#</th>
            <th className="border px-4 py-2 text-center">Producto</th>
            <th className="border px-4 py-2 text-center">Lugar</th>
            <th className="border px-4 py-2 text-center">Cantidad</th>
            <th className="border px-4 py-2 text-center">Stock Mínimo</th>
            <th className="border px-4 py-2 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {inventarios.length > 0 ? (
            inventarios.map((inventario, index) => (
              <InventarioFila
                key={inventario.id_inventario || index}
                index={index + 1}
                inventario={inventario}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center text-gray-500 py-4 border border-gray-300"
              >
                No hay inventarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Inventarios;
