import { useFormEntity } from "../../../utils/useFormEntity";
import { InputField, SelectField } from "../../../components/shared";
import { useRolMutations, usePermisos } from "../../../hooks/useEntities";
import { useRol } from "../../../hooks/useEntities";
import { FaEdit } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";

export default function EditRol() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const permisosOptions = () =>
    paraSelectsdestructuringYMap(usePermisos, "id", "name");

  const configuracionFormulario = (entidad) => ({
    name: entidad?.data?.name || "",
    permissions: entidad?.data?.permissions || [],
  });

  const camposExtras = (formValues) => ({
    permissions: formValues.permissions,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id,
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Permisos",
      name: "permissions",
      required: true,
      onChange: manejarEntradas.handleInputChange,
      options: permisosOptions(),
    },
  ];

  const paraNavegacion = {
    title: "Editar Rol",
    subTitle: "Actualice los datos del rol",
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
      useEntityMutations={useRolMutations}
      useEntity={useRol}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
