// components/shared/DetalleCompraForm.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useInventarios } from "../../hooks/useEntities";

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

export default function DetalleCompraForm({ value = [], onChange }) {
  const [detalles, setDetalles] = useState(
    value.length
      ? value
      : [
          {
            inventario: "",
            cantidad: 1,
            precio_unitario: 0,
            descuento_unitario: 0,
            subtotal: 0,
          },
        ]
  );

  const lastNotifiedDetalles = useRef(null);
  const { data: inventarios } = useInventarios({ all_data: true });

  useEffect(() => {
    if (!shallowEqualArray(value, detalles)) {
      setDetalles(
        value.length
          ? value
          : [
              {
                inventario: "",
                cantidad: 1,
                precio_unitario: 0,
                descuento_unitario: 0,
                subtotal: 0,
              },
            ]
      );
    }
  }, [value]);

  useEffect(() => {
    if (
      onChange &&
      !shallowEqualArray(lastNotifiedDetalles.current, detalles)
    ) {
      lastNotifiedDetalles.current = detalles;
      onChange(detalles);
    }
  }, [detalles, onChange]);

  const handleChange = (index, field, val) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index] = {
      ...nuevosDetalles[index],
      [field]: val,
    };
    if (
      field === "cantidad" ||
      field === "precio_unitario" ||
      field === "descuento_unitario"
    ) {
      const { cantidad, precio_unitario, descuento_unitario } =
        nuevosDetalles[index];
      nuevosDetalles[index].subtotal =
        (parseFloat(cantidad) || 0) * (parseFloat(precio_unitario) || 0) -
        (parseFloat(descuento_unitario) || 0);
    }
    setDetalles(nuevosDetalles);
  };

  const agregarFila = () => {
    setDetalles([
      ...detalles,
      {
        inventario: "",
        cantidad: 1,
        precio_unitario: 0,
        descuento_unitario: 0,
        subtotal: 0,
      },
    ]);
  };

  const eliminarFila = (index) => {
    if (detalles.length === 1) return;
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Inventario</th>
            <th className="p-2 border">Cant. Recibida</th>
            <th className="p-2 border">Precio Unitario</th>
            <th className="p-2 border">Desc. Unitario</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, index) => (
            <tr key={index}>
              <td className="border p-2">
                <select
                  className="w-full border p-1"
                  value={detalle.inventario}
                  onChange={(e) =>
                    handleChange(index, "inventario", e.target.value)
                  }
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
                  min="1"
                  value={detalle.cantidad}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "cantidad",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={detalle.precio_unitario}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "precio_unitario",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={detalle.descuento_unitario}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "descuento_unitario",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full border p-1"
                />
              </td>
              <td className="border p-2 text-right">
                {detalle.subtotal.toFixed(2)}
              </td>
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
