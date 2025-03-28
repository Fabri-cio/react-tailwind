import { Link } from "react-router-dom";

export function ActionButton({
  type,
  label,
  icon: Icon,
  estilos,
  onClick,
  disabled = false, // Soporte para deshabilitar
  to,
}) {
  const buttonContent =
    (console.log(estilos),
    (
      <button
        type={type || "button"} // Solo usa `submit` si se pasa explícitamente
        className={estilos}
        onClick={onClick}
        disabled={disabled} // Se deshabilita solo si no es un enlace
      >
        {Icon && <Icon className="mr-2 w-6 h-6" />} {label}
      </button>
    ));

  if (to) {
    return <Link to={to}>{buttonContent}</Link>; // Si `to` está definido, usamos `Link`
  }

  return buttonContent; // Si no hay `to`, mostramos solo el botón con `onClick`
}

// ("bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200");
