import { Link } from "react-router-dom";

export function ActionButton({
  type = "button",
  label,
  icon: Icon,
  estilos = "",
  onClick,
  disabled = false,
  to,
}) {
  const buttonClasses = `px-4 py-2 rounded-md flex items-center gap-2 transition duration-200 ${estilos}`;

  const content = (
    <>
      {Icon && <Icon className=" w-6 h-6" />}
      {label}
    </>
  );

  return to ? (
    <Link to={to} className={buttonClasses}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
