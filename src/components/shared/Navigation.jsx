import { ActionButton } from "./ActionButton";

export function Navigation({
  title,
  actions = [],
  subTitle = "",
  icon: Icon,
}) {
  return (
    <div className="flex flex-col border-2 border-gray-400 rounded-lg">
      <div className="flex justify-between rounded-lg p-1">
        {/* Enlace al listado */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-7 h-7 text-gray-700" />}
          <div>
            <h1 className="font-bold text-base text-gray-800">{title}</h1>
            {subTitle && <p className="text-gray-700 text-sm">{subTitle}</p>}
          </div>
        </div>

        {/* Botones de acciones */}
        <div className="flex items-center text-sm gap-3">
          {actions.map(({ to, label, icon, estilos }, index) => (
            <ActionButton
              key={index}
              to={to}
              label={label}
              icon={icon}
              estilos={estilos}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
