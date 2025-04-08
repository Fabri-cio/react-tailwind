import EntityForm from "./EntityForm";
import { useFormEntity } from "../../utils/useFormEntity";
import { useState } from "react";

export default function CreateEntity({
  useEntityMutations,
  configForm,
  paraEnvio,
  construirCampos,
  paraNavegacion,
}) {
  const {
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
  } = useFormEntity();

  const { crear } = useEntityMutations();

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configForm)
  );

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  };

  const envio = paraEnvio(formValues);

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario
    manejarEnvio(
      event,
      envio.link,
      formValues,
      crear,
      null,
      envio.entityId,
      { ...envio.params }
    );
  };

  const fields = construirCampos(formValues, manejarEntradas);

  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={fields}
      esLoading={false}
      paraNavegacion={paraNavegacion}
    />
  );
}
