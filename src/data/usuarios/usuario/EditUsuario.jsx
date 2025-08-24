import {
  useAlmacenes,
  useRoles,
  useUsuarioMutations,
  useUsuario,
} from "../../../hooks/useEntities";
import {
  InputField,
  SelectorDual,
  ToggleSwitch,
  CheckBox,
  SelectField,
  EditEntity,
} from "../../../components/shared";

import { FaEdit, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import { useFormEntity } from "../../../utils/useFormEntity";

export default function EditUsuario() {
  const { data: rolesData } = useRoles({ all_data: true });
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const almacenOptions = () =>
    paraSelectsdestructuringYMap(useAlmacenes, "id", "nombre");

  const selects = {
    almacenOptions,
  };

  const configuracionFormulario = (entidad) => ({
    first_name: entidad?.data?.first_name || "",
    last_name: entidad?.data?.last_name || "",
    username: entidad?.data?.username || "",
    email: entidad?.data?.email || "",
    birthday: entidad?.data?.birthday || "",
    lugar_de_trabajo: entidad?.data?.lugar_de_trabajo || "",
    roles: entidad?.data?.roles || [],
    is_active: entidad?.data?.is_active || false,
    is_superuser: entidad?.data?.is_superuser || false,
  });

  const camposExtras = (formValues) => ({
    lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
    roles: (formValues.roles || []).map((p) =>
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
      label: "Nombres",
      name: "first_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Apellidos",
      name: "last_name",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nombre de usuario",
      name: "username",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Correo Electronico",
      name: "email",
      type: "email",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Fecha de Nacimiento",
      name: "birthday",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Lugar de Trabajo",
      name: "lugar_de_trabajo",
      onChange: manejarEntradas.handleInputChange,
      options: selects.almacenOptions(),
      actionButtons: [
        {
          to: `/editAlmacen/${formValues.lugar_de_trabajo}`,
          icon: FaPencilAlt,
          estilos:
            "text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg p-1",
        },
        {
          to: "/createAlmacen",
          icon: FaPlus,
          estilos:
            "text-green-600 hover:bg-green-600 hover:text-white rounded-lg p-1",
        },
        {
          to: "/almacenes",
          icon: FaEye,
          estilos:
            "text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg p-1",
        },
      ],
    },
    {
      component: SelectorDual,
      data: rolesData,
      value: formValues.roles,
      onChange: (ids) => {
        manejarEntradas.handleInputChange({
          target: {
            name: "roles",
            value: ids,
          },
        });
      },
      labelLeft: "Roles Disponibles",
      labelRight: "Roles Seleccionados",
      itemLabel: "name", // campo de la data de permisos nombre
      label: "Roles",
      name: "roles",
      actionButtons: [
        {
          to: `/editRol/${formValues.id}`,
          icon: FaPencilAlt,
          estilos:
            "text-yellow-600 hover:bg-yellow-600 hover:text-white rounded-lg p-1",
        },
        {
          to: "/createRol",
          icon: FaPlus,
          estilos:
            "text-green-600 hover:bg-green-600 hover:text-white rounded-lg p-1",
        },
        {
          to: "/roles",
          icon: FaEye,
          estilos:
            "text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg p-1",
        },
      ],
    },
    {
      component: ToggleSwitch,
      label: "Estado del Usuario",
      name: "is_active",
      checked: formValues.is_active,
      onChange: manejarEntradas.handleToggleChange("is_active"),
    },
    {
      component: CheckBox,
      label: "Es admininstrador",
      name: "is_superuser",
      checked: formValues.is_superuser,
      onChange: manejarEntradas.handleToggleChange("is_superuser"),
    },
  ];

  const paraNavegacion = {
    title: "Editar Usuario",
    subTitle: "Modifique los datos del usuario si es necesario",
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
      useEntityMutations={useUsuarioMutations}
      useEntity={useUsuario}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
