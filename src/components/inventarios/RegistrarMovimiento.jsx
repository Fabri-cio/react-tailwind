import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTipMovMutations, useTipMovs } from "../../hooks/useEntities";

function RegistrarMovimiento() {
  const {
    data: responseTiposM = {},
    isLoading: loadingTiposM,
    isError: errorTiposM,
  } = useTipMovs();

  const tiposMovimiento = responseTiposM.data || [];

  const { state } = useLocation(); // Recibe los datos del inventario seleccionado desde la navegación
  const inventario = state?.inventario;

  const navigate = useNavigate();

  const { crear } = useTipMovMutations(); // Hook para crear el movimiento

  if (!inventario)
    return (
      <p className="text-center text-xl text-red-600">
        No se proporcionaron datos del inventario.
      </p>
    );

  // Definir estado local para registrar el movimiento
  const [cantidadMovimiento, setCantidadMovimiento] = useState(0);
  const [tipoMovimiento, setTipoMovimiento] = useState(tiposMovimiento[0]?.id || "entrada");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar cantidad de movimiento
    if (cantidadMovimiento <= 0) {
      alert("La cantidad debe ser mayor a cero.");
      return;
    }

    if (tipoMovimiento === "salida" && cantidadMovimiento > inventario.cantidad) {
      alert("No hay suficiente cantidad en inventario.");
      return;
    }

    // Crear el objeto nuevoMovimiento con la información necesaria
    const nuevoMovimiento = {
      id_producto: inventario.id_producto, // Producto del inventario
      id_almacen: inventario.id_almacen_tienda, // Almacén del inventario
      id_tipo: tipoMovimiento, // El tipo de movimiento seleccionado
      cantidad: cantidadMovimiento, // Cantidad de movimiento
      id_usuario: 1, // Aquí puedes poner el ID del usuario actual (ej. 1 para prueba)
    };

    // Llamar al API para crear el movimiento
    crear(nuevoMovimiento, {
      onSuccess: () => {
        console.log("Movimiento registrado con éxito");
        navigate("/ver_inventario"); // Redirigir al listado de inventarios después de un registro exitoso
      },
      onError: (error) => {
        console.error("Error al crear el movimiento", error);
      },
    });
  };

  if (loadingTiposM) {
    return <p className="text-center text-gray-600">Cargando tipos de movimiento...</p>;
  }

  if (errorTiposM) {
    return <p className="text-center text-red-600">Error al cargar los tipos de movimiento</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        Registrar Movimiento de Inventario
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-lg font-medium text-gray-800">
          <strong>Producto:</strong> {inventario.id_producto_nombre}
        </p>
        <p className="text-lg font-medium text-gray-800">
          <strong>Lugar:</strong> {inventario.id_almacen_tienda_nombre}
        </p>
        <p className="text-lg font-medium text-gray-800">
          <strong>Cantidad Actual:</strong> {inventario.cantidad}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label
              htmlFor="cantidadMovimiento"
              className="block text-lg font-medium text-gray-800"
            >
              Cantidad a mover:
            </label>
            <input
              type="number"
              id="cantidadMovimiento"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={cantidadMovimiento}
              onChange={(e) => setCantidadMovimiento(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label
              htmlFor="tipoMovimiento"
              className="block text-lg font-medium text-gray-800"
            >
              Tipo de Movimiento:
            </label>
            <select
              id="tipoMovimiento"
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
              value={tipoMovimiento}
              onChange={(e) => setTipoMovimiento(e.target.value)}
            >
              {tiposMovimiento.length > 0 ? (
                tiposMovimiento.map((tipo) => (
                  <option key={tipo.id_tipo} value={tipo.id_tipo}>
                    {tipo.nombre}
                  </option>
                ))
              ) : (
                <option value="entrada">Entrada</option>
              )}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Registrar Movimiento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrarMovimiento;
