import { ActionButton } from "./ActionButton";

export function Navigation({ title, actions = [], subTitle = "", icon: Icon }) {
  return (
    <div className="overflow-hidden shadow-sm border border-gray-200 bg-gray-400 rounded-t-lg">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4">
        {/* Enlace al listado */}
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-6 h-6 text-white" />}
          <div>
            <h1 className="font-bold text-base text-white">{title}</h1>
            {subTitle && <p className="text-white text-sm">{subTitle}</p>}
          </div>
        </div>

        {/* Botones de acciones */}
        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:justify-end pt-3 border-t border-gray-300 md:pt-0 md:border-0">
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
