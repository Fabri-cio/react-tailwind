import { useParams } from "react-router-dom";
import { useFormEntity } from "./useFormEntity";
import EntityForm from "./EntityForm";
import { FaBackspace, FaEdit } from "react-icons/fa";

export default function EditEntityForm(
  useEntityMutations,
  useEntity,
  configForm,
  paraEnvio
) {
  const { id } = useParams(); // Obtiene el parámetro 'id' de la URL utilizando useParams();

  const {
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
    usarEfecto,
  } = useFormEntity();

  const { actualizar } = useEntityMutations();

  const { data: entidad, isLoading } = useEntity(id);

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configForm(entidad))
  );

  usarEfecto(entidad, setFormValues, {
    //pasamos objeto con campos adicionales
  });

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario
    manejarEnvio(
      event,
      paraEnvio.link,
      formValues,
      null,
      actualizar,
      paraEnvio.entityId,
      {
        ...paraEnvio.params,
      }
    );
  };

  const fields = (formValues, manejarEntradas) => {};
  
  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={fields}
      esLoading={isLoading}
      entityId={paraEnvio.entityId}
      title={"Editar Producto"}
      subTitle={"Actualice los campos necesarios"}
      icon={FaEdit}
      actions={[
        {
          to: paraEnvio.link,
          label: "Volver",
          icon: FaBackspace,
          estilos:
            "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 p-1 gap-2",
        },
      ]}
    />
  );
}
