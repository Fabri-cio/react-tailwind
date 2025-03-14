export function ToggleSwitch({ label, checked, onChange }) {
    return (
      <div className="flex items-center">
        <label className="text-sm font-medium text-gray-700 pe-5">{label}</label>
        <div
          role="switch"
          aria-checked={checked}
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
            checked ? "bg-green-500" : "bg-red-400"
          }`}
          onClick={() => onChange(!checked)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
              checked ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
        <span className="ml-3 text-sm text-gray-700">{checked ? "Activo" : "Inactivo"}</span>
      </div>
    );
  }
  