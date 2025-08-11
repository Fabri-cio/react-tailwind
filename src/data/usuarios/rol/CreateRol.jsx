import { InputField, CreateEntity } from "../../../components/shared";
import { useRolMutations } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";
import SelectorPermisos from "../../../components/shared/SelectorPermisos";
import { usePermisos } from "../../../hooks/useEntities";

export default function CreateRol() {
  const { data: permisosData } = usePermisos();

  const estadoInicial = {
    name: "",
    permissions: [],
  };

  const camposExtras = (formValues) => ({
    permissions: formValues.permissions,
  });

  const paraEnvio = (formValues) => ({
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
      component: SelectorPermisos,
      permisosData: permisosData,
      value: formValues.permissions,
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: {
            name: "permissions",
            value: ids,
          },
        });
      },
      label: "Permisos",
      name: "permissions",
    },
  ];

  const paraNavegacion = {
    title: "Crear Rol",
    subTitle: "Asigna un nombre y selecciona permisos para este rol",
    icon: FaPlus,
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
    <CreateEntity
      useEntityMutations={useRolMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
