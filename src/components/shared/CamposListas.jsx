export default function CamposListas({
  label,
  name,
  value = [],
  onChange,
  visible = true,
}) {
  const camposPorTipo = {
    changepoints: ["ds"],
    eventos_especiales: ["holiday", "ds", "lower_window", "upper_window"],
    estacionalidades_personalizadas: ["name", "period", "fourier_order", "mode"],
    regresores_adicionales: ["name", "prior_scale", "mode"],
  };

  const camposNumericos = [
    "lower_window",
    "upper_window",
    "period",
    "fourier_order",
    "prior_scale",
  ];

  const campos = camposPorTipo[name] || ["value"];

  // Ocultar completamente si no es visible
  if (!visible) return null;

  const handleAdd = () => {
    const nuevoElemento = { _internalId: Date.now() };
    campos.forEach((campo) => {
      if (campo === "ds") {
        nuevoElemento[campo] = ""; // Fecha vacía
      } else if (camposNumericos.includes(campo)) {
        nuevoElemento[campo] = 0;
      } else {
        nuevoElemento[campo] = "";
      }
    });
    onChange({ target: { name, value: [...value, nuevoElemento] } });
  };

  const handleFieldChange = (index, campo, campoValor) => {
    let nuevoValor;
    if (camposNumericos.includes(campo)) {
      nuevoValor = Number(campoValor);
    } else {
      nuevoValor = campoValor;
    }
    const nuevaLista = value.map((item, i) =>
      i === index ? { ...item, [campo]: nuevoValor } : item
    );
    onChange({ target: { name, value: nuevaLista } });
  };

  const handleRemove = (index) => {
    const nuevaLista = value.filter((_, i) => i !== index);
    onChange({ target: { name, value: nuevaLista } });
  };

  return (
    <div className="mb-4">
      <label className="font-semibold mb-2 block">{label}</label>

      {value.map((item) => (
        <div
          key={item._internalId}
          className="border p-2 mb-2 rounded flex gap-2 items-end"
        >
          {campos.map((campo) => {
            // Detectar tipo de input
            const inputType =
              campo === "ds"
                ? "date"
                : camposNumericos.includes(campo)
                ? "number"
                : "text";

            return (
              <input
                key={campo}
                type={inputType}
                placeholder={campo}
                value={item[campo] || ""}
                onChange={(e) =>
                  handleFieldChange(value.indexOf(item), campo, e.target.value)
                }
                className="border p-1 rounded flex-1"
              />
            );
          })}
          <button
            type="button"
            onClick={() => handleRemove(value.indexOf(item))}
            className="bg-red-500 text-white p-1 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Agregar
      </button>
    </div>
  );
}
