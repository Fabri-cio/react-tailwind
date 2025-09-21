import React from "react";

export default function CamposListas({
  label,
  name,
  value = [],
  onChange,
  visible = true,
}) {
  const camposPorTipo = {
    cambios: ["ds"],
    eventos: ["holiday", "ds", "lower_window", "upper_window"],
    estacionalidades_extra: ["name", "period", "fourier_order", "mode"],
    regresores: ["name", "prior_scale", "mode"],
  };

  const camposNumericos = [
    "lower_window",
    "upper_window",
    "period",
    "fourier_order",
    "prior_scale",
  ];

  const camposConSelect = ["mode"]; // campos que deben usarse como <select>

  const opcionesPorCampo = {
    mode: [
      { value: "additive", label: "Aditiva" },
      { value: "multiplicative", label: "Multiplicativa" },
    ],
  };

  // Configuración de min, max y step para campos numéricos
  const configNumericos = {
    lower_window: { step: 1 },
    upper_window: { step: 1 },
    period: { min: 0.0001, step: 0.01 },
    fourier_order: { min: 1, step: 1 },
    prior_scale: { min: 0.0001, step: 0.01 },
  };

  const campos = camposPorTipo[name] || ["value"];

  if (!visible) return null;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (isNaN(date.getTime())) return "";
    return date.toISOString().split("T")[0];
  };

  // Convierte strings en objetos { ds: "..." } para la UI
  const valueConObjetos = value.map((v) =>
    typeof v === "string" && campos[0] === "ds" ? { ds: v } : v
  );

  // Añade un _internalId si no existe
  const agregarIdsInternos = (lista) =>
    lista.map((item) =>
      item._internalId ? item : { ...item, _internalId: crypto.randomUUID() }
    );

  const handleAdd = () => {
    const nuevoElemento = { _internalId: crypto.randomUUID() };
    campos.forEach((campo) => {
      if (campo === "ds") nuevoElemento[campo] = "";
      else if (camposNumericos.includes(campo)) nuevoElemento[campo] = 0;
      else nuevoElemento[campo] = "";
    });
    onChange({
      target: {
        name,
        value: [...agregarIdsInternos(valueConObjetos), nuevoElemento],
      },
    });
  };

  const handleFieldChange = (index, campo, campoValor) => {
    const nuevoValor = camposNumericos.includes(campo)
      ? Number(campoValor)
      : campoValor;
    const nuevaLista = agregarIdsInternos(valueConObjetos).map((item, i) =>
      i === index ? { ...item, [campo]: nuevoValor } : item
    );

    // Si originalmente era array de strings, devolver solo strings
    if (campos[0] === "ds" && value.every((v) => typeof v === "string")) {
      onChange({
        target: { name, value: nuevaLista.map((item) => item.ds) },
      });
    } else {
      onChange({ target: { name, value: nuevaLista } });
    }
  };

  const handleRemove = (index) => {
    const nuevaLista = agregarIdsInternos(valueConObjetos).filter(
      (_, i) => i !== index
    );

    // Mantener formato original
    if (campos[0] === "ds" && value.every((v) => typeof v === "string")) {
      onChange({
        target: { name, value: nuevaLista.map((item) => item.ds) },
      });
    } else {
      onChange({ target: { name, value: nuevaLista } });
    }
  };

  const isInvalidDate = (val) => {
    if (!val) return false;
    return isNaN(new Date(val).getTime());
  };

  return (
    <div className="mb-4">
      <label className="font-semibold mb-2 block">{label}</label>

      {agregarIdsInternos(valueConObjetos).map((item, index) => (
        <div
          key={item._internalId}
          className="border p-2 mb-2 rounded flex gap-2 items-end"
        >
          {campos.map((campo) => {
            // Select para "mode"
            if (camposConSelect.includes(campo)) {
              return (
                <select
                  key={`${item._internalId}-${campo}`}
                  value={item[campo] ?? ""}
                  onChange={(e) =>
                    handleFieldChange(index, campo, e.target.value)
                  }
                  className="border p-1 rounded flex-1"
                >
                  <option value="" disabled>
                    Seleccione {campo}
                  </option>
                  {opcionesPorCampo[campo].map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              );
            }

            // Inputs normales
            const inputType =
              campo === "ds"
                ? "date"
                : camposNumericos.includes(campo)
                ? "number"
                : "text";

            return (
              <input
                key={`${item._internalId}-${campo}`}
                type={inputType}
                placeholder={campo}
                value={
                  campo === "ds" ? formatDate(item[campo]) : item[campo] ?? ""
                }
                onChange={(e) =>
                  handleFieldChange(index, campo, e.target.value)
                }
                className={`border p-1 rounded flex-1 ${
                  campo === "ds" && isInvalidDate(item[campo])
                    ? "border-red-500"
                    : ""
                }`}
                {...(camposNumericos.includes(campo)
                  ? configNumericos[campo]
                  : {})}
              />
            );
          })}

          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="bg-red-500 text-white p-1 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded mt-2 flex items-center gap-1"
      >
        Agregar
      </button>
    </div>
  );
}
