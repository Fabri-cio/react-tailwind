import { ActionButton } from "./ActionButton";
import Loading from "./Loading";
import { Navigation } from "./Navigation";

const EntityForm = ({
  valorsForm,
  manejarEnviar,
  fields,
  esLoading,
  entityId,
  paraNavegacion,
}) => {
  if (esLoading) return <Loading />;

  return (
    <div className="m-4">
      <Navigation
        title={paraNavegacion.title}
        subTitle={paraNavegacion.subTitle}
        icon={paraNavegacion.icon}
        actions={paraNavegacion.actions}
      />
      <form
        onSubmit={manejarEnviar}
        encType="multipart/form-data"
        className="space-y-3 p-2 border-2 border-gray-200 bg-white w-full"
      >
        {fields.map(({ component: Component, actionButtons, ...props }) => (
          <div
            key={props.name}
            className={actionButtons && "flex flex-col md:flex-row items-start"}
          >
            <Component {...props} value={valorsForm[props.name]} />

            {/* Renderizando los botones adicionales */}
            {actionButtons && (
              <div className="mt-8 flex flex-wrap m-1">
                {actionButtons.map((button, index) => (
                  <ActionButton key={index} {...button} />
                ))}
              </div>
            )}
          </div>
        ))}

        <ActionButton
          type="submit"
          label={entityId ? "Actualizar" : "Crear"}
          estilos={
            entityId
              ? "hover:bg-green-600 hover:text-gray-100 bg-blue-700 text-white rounded-md flex items-center gap-2 transition duration-200 p-1 px-4"
              : "hover:bg-green-600 hover:text-gray-100 bg-green-700 text-white rounded-md flex items-center gap-2 transition duration-200 p-1 px-4"
          }
        />
      </form>
    </div>
  );
};

export default EntityForm;
