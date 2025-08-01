import { useFormEntity } from "../../../utils/useFormEntity";
import { useAlmacenes, useRoles, useUsuarioMutations } from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { CheckBox } from "../../../components/shared/CheckBox";
import { FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import CreateEntity from "../../../components/shared/CreateEntity";

export default function CreateUsuario() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const almacenOptions = () =>
    paraSelectsdestructuringYMap(
      useAlmacenes,
      "id_almacen_tienda",
      "nombre"
    );

  const rolesOptions = () =>
    paraSelectsdestructuringYMap(useRoles, "id", "name");

  const selects = {
    almacenOptions,
    rolesOptions,
  };

  const configuracionFormulario = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    birthday: "",
    lugar_de_trabajo: "",
    rol: "",
    is_active: false,
    is_superuser: false,
  };

  const camposExtras = (formValues) => ({
    lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
    rol: Number(formValues.rol),
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
          to: "/editAlmacen",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addAlmacen",
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
      component: SelectField,
      label: "Rol",
      name: "rol",
      onChange: manejarEntradas.handleInputChange,
      options: selects.rolesOptions(),
      actionButtons: [
        {
          to: "/editRol",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addRol",
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
        estilos: "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useUsuarioMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
