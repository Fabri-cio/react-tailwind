import { Link } from "react-router-dom";
import { ActionButton } from "./ActionButton";

export function Navigation({ 
  entityName, 
  listPath, 
  actions = [], 
  subTitle = "", 
  icon: Icon 
}) {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-gray-100 shadow-md">
      <Link to={listPath} className="flex items-center gap-2">
        {Icon && <Icon className="text-gray-600 text-2xl" />}
        <div>
          <h1 className="font-bold text-2xl">Gestión de {entityName}</h1>
          {subTitle && <p className="text-gray-500 text-sm">{subTitle}</p>}
        </div>
      </Link>

      <div className="flex items-center text-sm gap-3">
        {actions.map(({ to, label, icon, color }, index) => (
          <ActionButton key={index} to={to} label={label} icon={icon} color={color} />
        ))}
      </div>
    </div>
  );
}
