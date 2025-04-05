import { ActionButton } from "../../shared/ActionButton";
import { Navigation } from "../../shared/Navigation";
import { FaEdit } from "react-icons/fa";

const EntityForm = ({
  valorsForm,
  manejarEnviar,
  fields,
  esLoading,
  entityId,
  title,
  subTitle,
  icon,
  actions = [],
}) => {
  if (esLoading) return <div>Loading...</div>;

  return (
    <div className="mx-80">
      <Navigation
        title={title}
        subTitle={subTitle}
        icon={icon}
        actions={actions}
      />
      <form
        onSubmit={manejarEnviar}
        className="space-y-3 p-2 border-2 border-gray-400 rounded-lg my-2"
      >
        {fields.map(
          (
            { component: Component, ...props } // Cambié 'conponent' por 'component'
          ) => (
            <Component
              key={props.name}
              {...props}
              value={valorsForm[props.name]}
            />
          )
        )}

        <ActionButton
          type="submit"
          label={entityId ? "Actualizar" : "Crear"}
          estilos="hover:bg-gray-600 hover:text-gray-100 text-black border-2 border-gray-400 px-4 py-2 rounded-md flex items-center gap-2 transition duration-200"
        />
      </form>
    </div>
  );
};

export default EntityForm;
