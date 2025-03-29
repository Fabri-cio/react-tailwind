import React, { useState, useEffect, useRef } from "react";
import { ActionButton } from "../../components/shared/ActionButton"; // Importa el ActionButton

const Dropdown = ({ options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Usamos una referencia para el dropdown

  // Toggle para abrir o cerrar el dropdown
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false); // Cerrar el dropdown si se hace clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Agregamos el evento
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Limpiamos el evento
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Botón para abrir/cerrar el dropdown */}
      <ActionButton
        icon={Icon} // Pasa el icono al ActionButton
        onClick={toggleDropdown}
        estilos="text-white" // Puedes agregar más clases aquí si es necesario
      />
      
      {/* Lista desplegable */}
      {isOpen && (
        <div className="absolute z-10 bg-white rounded-lg shadow w-48 top-full right-0 mt-2">
          <ul className="py-2 text-sm text-gray-950">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => onChange(option)}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  {option.label}
                </button>
                <ActionButton
                    label={option.label}
                    onClick={() => onChange(option)}
                    icon={Icon}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
