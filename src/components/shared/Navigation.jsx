import { ActionButton } from "./ActionButton";

export function Navigation({ title, actions = [], subTitle = "", icon: Icon }) {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-green-500 shadow-md">
      {/* Enlace al listado */}
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-1 h-1" />}
        <div>
          <h1 className="font-bold text-2xl">{title}</h1>
          {subTitle && <p className="text-gray-500 text-sm">{subTitle}</p>}
        </div>
      </div>

      {/* Botones de acciones */}
      <div className="flex items-center text-sm gap-3">
        {actions.map(({ to, label, icon, estilos }, index) => (
          <ActionButton
            key={index} // Ahora usamos el `label` como key
            to={to}
            label={label}
            icon={icon}
            estilos={estilos} // Pasamos estilos personalizados
          />
        ))}
      </div>
    </div>
  );
}
