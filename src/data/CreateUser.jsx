import { useFormEntity } from "../utils/useFormEntity";
import { useAlmacenes, useRoles, useUserMutations } from "../hooks/useEntities";
import { InputField } from "../components/shared/InputField";
import { SelectField } from "../components/shared/SelectField";
import { ToggleSwitch } from "../components/shared/ToggleSwitch";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import CreateEntity from "../components/shared/CreateEntity";

export default function CreateProduct() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const almacenOptions = () =>
    paraSelectsdestructuringYMap(
      useAlmacenes,
      true,
      "id_almacen_tienda",
      "nombre"
    );

  const rolesOptions = () =>
    paraSelectsdestructuringYMap(useRoles, true, "id", "name");

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
    role: "",
    is_active: false,
  };

  const camposExtras = (formValues) => ({
    lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
    role: Number(formValues.role),
  });

  const paraEnvio = (formValues) => ({
    link: "/userList",
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
          to: "/editCategory",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: SelectField,
      label: "Rol",
      name: "role",
      onChange: manejarEntradas.handleInputChange,
      options: selects.rolesOptions(),
    },
    {
      component: ToggleSwitch,
      label: "Estado del Usuario",
      name: "is_active",
      checked: formValues.is_active,
      onChange: manejarEntradas.handleToggleChange("is_active"),
    },
  ];

  const paraNavegacion = {
    title: "Crear Producto",
    subTitle: "Crea un nuevo producto",
    icon: FaPlus,
    actions: [
      {
        to: "/productList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "border-2 border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white p-2 rounded-lg",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useUserMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
