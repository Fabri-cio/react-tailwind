import {
  useProductMutations,
  useCategorias,
  useProveedores,
  useProduct,
} from "../hooks/useEntities";
import { InputField } from "../components/shared/InputField";
import { ToggleSwitch } from "../components/shared/ToggleSwitch";
import { SelectField } from "../components/shared/SelectField";
import { obtenerIdUser } from "../utils/auth";
import {
  FaBackspace,
  FaEdit,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import EditEntity from "../components/shared/EditEntity";
import { useFormEntity } from "../utils/useFormEntity";

export default function EditProduct() {
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

  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    precio: entidad?.data?.precio || "",
    codigo_barras: entidad?.data?.codigo_barras || "",
    id_proveedor: entidad?.data?.id_proveedor || "",
    categoria: entidad?.data?.categoria || "",
    estado: entidad?.data?.estado || false,
  });

  const camposExtras = (formValues) => ({
    id_proveedor: Number(formValues.id_proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    usuario_modificacion: logicaNegocio.idUsuario,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_producto,
    link: "/productList",
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
      label: "Precio",
      name: "precio",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Codigo de Barras",
      name: "codigo_barras",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },

    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      onChange: manejarEntradas.handleInputChange,
      options: selects.categoriasOptions(),
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
      onChange: manejarEntradas.handleInputChange,
      options: selects.proveedoresOptions(),
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      onChange: manejarEntradas.handleToggleChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Producto",
    subTitle: "Actualice los datos del producto",
    icon: FaEdit,
    actions: [
      {
        to: "/productList",
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 p-1 gap-2",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useProductMutations}
      useEntity={useProduct}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
