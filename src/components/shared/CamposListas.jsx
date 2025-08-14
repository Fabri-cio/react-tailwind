import React from "react";

// Define qué campos van a tener los diferentes tipos de listas
const camposPorTipo = {
  changepoints: ["ds"],
  eventos_especiales: ["holiday", "ds", "lower_window", "upper_window"],
  estacionalidades_personalizadas: ["name", "period", "fourier_order", "mode"],
  regresores_adicionales: ["name", "prior_scale", "mode"],
};

// Componente que renderiza una lista dinámica de inputs
export default function CamposListas({ label, name, value = [], onChange }) {
  // Obtiene los campos según el tipo de lista
  const campos = camposPorTipo[name] || ["value"];

  // Función para agregar un nuevo elemento a la lista
  const handleAdd = () => {
    // Se crea un objeto vacío con todos los campos y un id único
    const nuevaLista = [
      ...value,
      { id: Date.now(), ...Object.fromEntries(campos.map((c) => [c, ""])) },
    ];
    // Se llama al onChange del formulario para actualizar el estado
    onChange({ target: { name, value: nuevaLista } });
  };

  // Función que actualiza un campo específico de un elemento
  const handleFieldChange = (index, campo, campoValor) => {
    const nuevaLista = value.map((item, i) =>
      i === index ? { ...item, [campo]: campoValor } : item
    );
    onChange({ target: { name, value: nuevaLista } });
  };

  // Función para eliminar un elemento de la lista
  const handleRemove = (index) => {
    const nuevaLista = value.filter((_, i) => i !== index);
    onChange({ target: { name, value: nuevaLista } });
  };

  return (
    <div className="mb-4">
      {/* Título de la sección */}
      <label className="font-semibold mb-2 block">{label}</label>

      {/* Itera sobre los elementos de la lista */}
      {value.map((item, index) => (
        <div
          key={item.id || index} // Cada elemento necesita un key único para React
          className="border p-2 mb-2 rounded flex gap-2 items-end"
        >
          {/* Renderiza los inputs de cada campo */}
          {campos.map((campo) => (
            <input
              key={campo} // Cada input también necesita un key
              type="text"
              placeholder={campo}
              value={item[campo] || ""}
              onChange={(e) => handleFieldChange(index, campo, e.target.value)}
              className="border p-1 rounded flex-1"
            />
          ))}

          {/* Botón para eliminar este elemento */}
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="bg-red-500 text-white p-1 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}

      {/* Botón para agregar un nuevo elemento */}
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
