import {
  useTipoMovimientoMutations,
  useTipoMovimiento,
} from "../../../hooks/useEntities";
import { InputField, SelectField } from "../../../components/shared";
import { FaEdit } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";

export default function EditTipoMovimiento() {
  const naturalezaOptions = () => [
    { id: "Entrada", nombre: "Entrada" },
    { id: "Salida", nombre: "Salida" },
  ];

  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    descripcion: entidad?.data?.descripcion || "",
    naturaleza: entidad?.data?.naturaleza || "",
  });

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    descripcion: formValues.descripcion,
    naturaleza: formValues.naturaleza,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_tipomovimiento
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
      label: "Descripción",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Naturaleza",
      name: "naturaleza",
      options: naturalezaOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Tipo de Movimiento",
    subTitle: "Actualice los datos del tipo de movimiento",
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
      useEntityMutations={useTipoMovimientoMutations}
      useEntity={useTipoMovimiento}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
