import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useInventariosSelect } from "../../hooks/useEntities";

// Función simple para comparar arrays de objetos (solo primer nivel)
function shallowEqualArray(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    const obj1 = arr1[i];
    const obj2 = arr2[i];
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) return false;
    }
  }
  return true;
}

export default function DetallePedidoForm({ value = [], onChange, isCompra = false }) {
  const [detalles, setDetalles] = useState(
    value.length ? value : [{ producto: "", cantidad_solicitada: 1 }]
  );

  const lastNotifiedDetalles = useRef(null);

  const { data: inventarios } = useInventariosSelect({ all_data: true });

  // Sincroniza el estado interno solo si es diferente
  useEffect(() => {
    if (!shallowEqualArray(value, detalles)) {
      setDetalles(value.length ? value : [{ producto: "", cantidad_solicitada: 1 }]);
    }
  }, [value]); // solo cuando cambia value

  // Notificar cambios al padre solo si cambió de verdad
  useEffect(() => {
    if (onChange && !shallowEqualArray(lastNotifiedDetalles.current, detalles)) {
      lastNotifiedDetalles.current = detalles;
      onChange(detalles);
    }
  }, [detalles, onChange]);

  const handleChange = (index, field, val) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index] = { ...nuevosDetalles[index], [field]: val };
    setDetalles(nuevosDetalles);
  };

  const agregarFila = () => {
    setDetalles([...detalles, { producto: "", cantidad_solicitada: 1 }]);
  };

  const eliminarFila = (index) => {
    if (detalles.length === 1) return; // no eliminar si solo queda uno
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Producto</th>
            <th className="p-2 border">Cantidad Solicitada</th>
            {isCompra && (
              <>
                <th className="p-2 border">Cantidad Recepcionada</th>
                <th className="p-2 border">Precio Unitario</th>
                <th className="p-2 border">Descuento Unitario</th>
                <th className="p-2 border">Subtotal</th>
              </>
            )}
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td className="border p-2">
                <select
                  className="w-full border p-1"
                  value={detalle.producto}
                  onChange={(e) => handleChange(index, "producto", e.target.value)}
                >
                  <option value="">-- Seleccione --</option>
                  {inventarios?.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.producto_nombre}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-full border p-1"
                  value={detalle.cantidad_solicitada}
                  min="1"
                  onChange={(e) =>
                    handleChange(index, "cantidad_solicitada", parseInt(e.target.value) || 1)
                  }
                />
              </td>

              {isCompra && (
                <>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full border p-1"
                      value={detalle.cantidad_recepcionada}
                      min="1"
                      onChange={(e) =>
                        handleChange(index, "cantidad_recepcionada", parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full border p-1"
                      value={detalle.precio_unitario}
                      min="1"
                      onChange={(e) =>
                        handleChange(index, "precio_unitario", parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full border p-1"
                      value={detalle.descuento_unitario}
                      min="1"
                      onChange={(e) =>
                        handleChange(index, "descuento_unitario", parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full border p-1"
                      value={detalle.subtotal}
                      min="1"
                      onChange={(e) =>
                        handleChange(index, "subtotal", parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                </>
              )}
              

              <td className="border p-2 text-center">
                <button
                  type="button"
                  className="text-red-600"
                  onClick={() => eliminarFila(index)}
                  disabled={detalles.length === 1}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        className="mt-2 flex items-center bg-green-500 text-white px-3 py-1 rounded"
        onClick={agregarFila}
      >
        <FaPlus className="mr-1" /> Agregar producto
      </button>
    </div>
  );
}
