import { useState } from "react";
import { useFormEntity } from "./useFormEntity";
import {
  useProductMutations,
  useCategorias,
  useProveedores,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import EntityForm from "./EntityForm";
import { obtenerIdUser } from "../../../utils/auth";
import {
  FaBackspace,
  FaEye,
  FaPencilAlt,
  FaPlus,
  FaProductHunt,
} from "react-icons/fa";

export default function CreateProduct() {
  const idUsuario = obtenerIdUser;
  console.log(idUsuario);

  const {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
    destructuring,
  } = useFormEntity();

  const { crear } = useProductMutations();

  const categorias = destructuring(useCategorias);
  const proveedores = destructuring(useProveedores);

  const configuracionFormulario = {
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: false,
  };

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configuracionFormulario)
  );

  const handleInputChange = manejarCambioDeEntrada(setFormValues);

  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const handleSubmit = (event) => {
    manejarEnvio(event, "productList", formValues, crear, null, null, {
      id_proveedor: Number(formValues.id_proveedor),
      categoria: Number(formValues.categoria),
      precio: parseFloat(formValues.precio).toFixed(2),
      usuario_creacion: idUsuario(),
    });
  };

  const categoriasOptions = () =>
    options(categorias, "id_categoria", "nombre_categoria");
  const proveedoresOptions = () =>
    options(proveedores, "id_proveedor", "nombre_proveedor");

  //factorizado

  const components = [
    // Corregí 'conponentes' por 'components' y 'conponent' por 'component'
    {
      component: InputField, // Nombre corregido
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: handleInputChange,
    },
    {
      component: InputField,
      label: "Precio",
      name: "precio",
      type: "number",
      required: true,
      onChange: handleInputChange,
    },
    {
      component: InputField,
      label: "Código de Barras",
      name: "codigo_barras",
      onChange: handleInputChange,
    },
    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      options: categoriasOptions(),
      onChange: handleInputChange,
      actionButtons: [
        {
          to: "/editCategory",
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white ",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white",
        }
      ],
    },
    {
      component: SelectField,
      label: "Proveedor",
      name: "id_proveedor",
      options: proveedoresOptions(),
      onChange: handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      onChange: handleToggleChange,
    },
  ];

  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={components} // Cambié 'conponentes' por 'components'
      esLoading={false}
      title={"Crear Producto"}
      subTitle={"Crea un nuevo producto"}
      icon={FaProductHunt}
      actions={[
        {
          to: "/productList",
          label: "Volver",
          icon: FaBackspace,
          estilos:
            "border-2 border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white",
        },
      ]}
    />
  );
}
