import {
  useClienteMutations,
  useCliente,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { FaEdit} from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";

export default function EditCliente() {
  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    correo: entidad?.data?.correo || "",
    nit_ci: entidad?.data?.nit_ci || "",
  });

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    correo: formValues.correo,
    nit_ci: formValues.nit_ci,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_cliente
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Correo",
      name: "correo",
      type: "email",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nit/Ci",
      name: "nit_ci",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Cliente",
    subTitle: "Actualice los datos del cliente",
    icon: FaEdit,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        estilos:
          "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useClienteMutations}
      useEntity={useCliente}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
