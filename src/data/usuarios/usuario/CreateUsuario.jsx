import { useFormEntity } from "../../../utils/useFormEntity";
import {
  useAlmacenes,
  useRoles,
  useUsuarioMutations,
} from "../../../hooks/useEntities";
import {
  InputField,
  SelectField,
  ToggleSwitch,
  CheckBox,
  SelectorDual,
  CreateEntity,
} from "../../../components/shared";

import { FaEye, FaPlus } from "react-icons/fa";

export default function CreateUsuario() {
  const { paraSelectsdestructuringYMap } = useFormEntity();
  const { data: rolesData } = useRoles({all_data: true});

  const almacenOptions = () =>
    paraSelectsdestructuringYMap(useAlmacenes, "id", "nombre");

  const selects = {
    almacenOptions,
  };

  const estadoInicial = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    birthday: "",
    lugar_de_trabajo: "",
    roles: [],
    is_active: false,
    is_superuser: false,
  };

  const camposExtras = (formValues) => ({
    lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
    roles: formValues.roles,
  });

  const paraEnvio = (formValues) => ({
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
      autoComplete: "email",
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
      component: InputField,
      label: "Contraseña",
      name: "password",
      type: "password",
      required: true,
      autoComplete: "password",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Confirmar Contraseña",
      name: "confirm_password",
      type: "password",
      required: true,
      autoComplete: "confirm-password",
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
          to: "/createAlmacen",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/almacenes",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
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
      itemLabel: "name",  // campo de la data de permisos nombre
      label: "Roles",
      name: "roles",
      actionButtons: [
        {
          to: "/createRol",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/roles",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
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
    title: "Crear Usuario",
    subTitle: "Crea un nuevo usuario",
    icon: FaPlus,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        estilos:
          "border-2 border-red-700 rounded-lg bg-red-700 text-white p-2 hover:bg-red-600 hover:text-red-100",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useUsuarioMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
