import { useFormEntity } from "../utils/useFormEntity";
import {
  useProductMutations,
  useCategorias,
  useProveedores,
} from "../hooks/useEntities";
import { InputField } from "../components/shared/InputField";
import { SelectField } from "../components/shared/SelectField";
import { ToggleSwitch } from "../components/shared/ToggleSwitch";
import { obtenerIdUser } from "../utils/auth";
import { FaBackspace, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import CreateEntity from "../components/shared/CreateEntity";

export default function CreateProduct() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const categoriasOptions = () =>
    paraSelectsdestructuringYMap(
      useCategorias,
      true,
      "id_categoria",
      "nombre_categoria"
    );
  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(
      useProveedores,
      true,
      "id_proveedor",
      "nombre_proveedor"
    );

  const selects = {
    categoriasOptions,
    proveedoresOptions,
  };

  const configuracionFormulario = {
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: false,
  };

  const camposExtras = (formValues) => ({
    id_proveedor: Number(formValues.id_proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    usuario_creacion: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => ({
    link: "/productList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField, // Nombre corregido
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Precio",
      name: "precio",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Código de Barras",
      name: "codigo_barras",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      options: categoriasOptions(),
      onChange: manejarEntradas.handleInputChange,
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
      label: "Proveedor",
      name: "id_proveedor",
      options: proveedoresOptions(),
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      onChange: manejarEntradas.handleToggleChange("estado"),
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
      useEntityMutations={useProductMutations}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
