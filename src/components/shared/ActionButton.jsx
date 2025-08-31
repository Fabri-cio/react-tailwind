import { Link } from "react-router-dom";

export function ActionButton({
  type = "button",
  label,
  icon: Icon,
  estilos = "",
  styleIcon,
  onClick,
  disabled = false,
  to,
  title,
}) {
  const buttonClasses = `
    flex 
    text-sm md:text-base 
    rounded transition duration-200
    ${estilos}
  `;

  const content = (
    <>
      {Icon && <Icon className={`w-4 h-4 md:w-5 md:h-5 ${styleIcon}`} />}
      <span className="truncate">{label}</span>
    </>
  );

  return to ? (
    <Link to={to} className={buttonClasses} title={title || label}>
      {content}
    </Link>
  ) : (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      title={title || label}
    >
      {content}
    </button>
  );
}
