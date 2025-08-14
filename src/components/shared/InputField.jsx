export function InputField({ label, type = "text", value, visible = true, className = "", ...props }) {
  const inputValue =
    type === "file"
      ? undefined
      : type === "number"
      ? value ?? "" // permite 0, null se convierte a ""
      : value ?? "";

  // Clases de animación y visibilidad
  const visibilityClasses = visible ? "max-h-40 opacity-100" : "max-h-0 opacity-0";

  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${visibilityClasses} ${className}`}>
      <label className="block text-gray-700 font-medium text-sm mb-2">
        {label}
      </label>
      <input
        type={type}
        value={inputValue}
        {...props}
        className="w-full p-2 text-sm border border-gray-300 rounded"
      />
    </div>
  );
}
