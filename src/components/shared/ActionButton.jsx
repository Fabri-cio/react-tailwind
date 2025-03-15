import { Link } from "react-router-dom";

export function ActionButton({
  to,
  onClick,
  label,
  color = "blue",
  icon: Icon,
}) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };

  const buttonContent = (
    <button
      className={`${colors[color]} text-white px-3 py-1 rounded-md flex items-center gap-2`}
      onClick={onClick} // Solo se ejecuta si `onClick` es pasado
    >
      {Icon && <Icon />} {label}
    </button>
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>; // Si `to` está definido, usamos `Link`
  }

  return buttonContent; // Si no hay `to`, mostramos solo el botón con `onClick`
}
