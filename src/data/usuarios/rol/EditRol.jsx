import { InputField, SelectorDual, EditEntity } from "../../../components/shared";
import { useRolMutations, usePermisos } from "../../../hooks/useEntities";
import { useRol } from "../../../hooks/useEntities";
import { FaEdit } from "react-icons/fa";


export default function EditRol() {
  const { data: permisosData } = usePermisos({all_data: true});

  const configuracionFormulario = (entidad) => ({
    name: entidad?.data?.name || "",
    permissions: entidad?.data?.permissions || [],
  });

  const camposExtras = (formValues) => ({
    permissions: (formValues.permissions || []).map((p) =>
      typeof p === "object" && p !== null ? p.id : p
    ),
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
      component: SelectorDual,
      data: permisosData,
      value: formValues.permissions,
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: {
            name: "permissions",
            value: ids,
          },
        });
      },
      labelLeft: "Permisos Disponibles",
      labelRight: "Permisos Seleccionados",
      itemLabel: "name",  // campo de la data de permisos nombre
      label: "Permisos",
      name: "permissions",
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
