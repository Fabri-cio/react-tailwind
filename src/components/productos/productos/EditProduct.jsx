import { useParams } from "react-router-dom";
import { useFormEntity } from "./useFormEntity";
import {
  useProductMutations,
  useCategorias,
  useProveedores,
  useProduct,
} from "../../../hooks/useEntities";
import { useState } from "react";
import { InputField } from "../../../components/shared/InputField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { SelectField } from "../../../components/shared/SelectField";
import EntityForm from "./EntityForm";
import { obtenerIdUser } from "../../../utils/auth";
import {
  FaBackspace,
  FaEdit,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";

export default function EditProduct() {
  const { id } = useParams();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const {
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
    usarEfecto,
    paraSelectsdestructuringYMap,
  } = useFormEntity();

  const { actualizar } = useProductMutations();

  const { data: producto, isLoading } = useProduct(id);

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
    nombre: producto?.data?.nombre || "",
    precio: producto?.data?.precio || "",
    codigo_barras: producto?.data?.codigo_barras || "",
    id_proveedor: producto?.data?.id_proveedor || "",
    categoria: producto?.data?.categoria || "",
    estado: producto?.data?.estado || false,
  };

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configuracionFormulario)
  );

    usarEfecto(producto, setFormValues, {
      //pasamos objeto con campos adicionales
    });

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const manejarEntradas = {
    handleInputChange,
    handleToggleChange,
  }

  const camposExtras = {
    id_proveedor: Number(formValues.id_proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    usuario_modificacion: logicaNegocio.idUsuario,
  };

  const paraEnvio = {
    entityId: formValues.id_producto,
    link: "/productList",
    mutacion: actualizar,
    params: camposExtras,
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario
    manejarEnvio(
      event,
      paraEnvio.link,
      formValues,
      null,
      paraEnvio.mutacion,
      paraEnvio.entityId,
      {
        ...paraEnvio.params,
      }
    );
  };

  const fields = [
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
  return (
    <EntityForm
      valorsForm={formValues}
      manejarEnviar={handleSubmit}
      fields={fields}
      esLoading={isLoading}
      entityId={paraEnvio.entityId}
      title={"Editar Producto"}
      subTitle={"Actualice los datos del producto"}
      icon={FaEdit}
      actions={[
        {
          to: paraEnvio.link,
          label: "Volver",
          icon: FaBackspace,
          estilos:
            "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 p-1 gap-2",
        },
      ]}
    />
  );
}
