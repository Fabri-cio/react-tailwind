import { ActionButton } from "../../shared/ActionButton";

const EntityForm = ({ valorsForm, manejarEnviar, fields, esLoading, entityId}) => {
  if (esLoading) return <div>Loading...</div>;

  return (
    <form
      onSubmit={manejarEnviar}
      className="space-y-3 p-2 border-2 border-gray-400 rounded-lg"
    >
      {fields.map(({ component: Component, ...props }) => (  // Cambié 'conponent' por 'component'
        <Component key={props.name} {...props} value={valorsForm[props.name]} />
      ))}

      <ActionButton
        type="submit"
        label={entityId ? "Actualizar" : "Crear"}
        estilos="hover:bg-gray-600 hover:text-gray-100 text-black border-2 border-gray-400 px-4 py-2 rounded-md flex items-center gap-2 transition duration-200"
      />
    </form>
  );
};

export default EntityForm;
