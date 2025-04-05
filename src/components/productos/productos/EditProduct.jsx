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
import { FaBackspace, FaEdit } from "react-icons/fa";

export default function EditProduct() {
  const { id } = useParams();

  const idUsuario = obtenerIdUser();

  const {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    manejarEnvio,
    usarEfecto,
    destructuring,
  } = useFormEntity();

  const { actualizar } = useProductMutations();

  const { data: producto, isLoading } = useProduct(id);

  const categorias = destructuring(useCategorias);
  const proveedores = destructuring(useProveedores);

  const configuracionFormulario = {
    nombre: producto?.data?.nombre || "",
    precio: producto?.data?.precio || "",
    codigo_barras: producto?.data?.codigo_barras || "",
    id_proveedor:   producto?.data?.id_proveedor || "",
    categoria:  producto?.data?.categoria || "",
    estado: producto?.data?.estado || false,
  };

  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configuracionFormulario)
  );

  const categoriasOptions = () =>
    options(categorias, "id_categoria", "nombre_categoria");
  const proveedoresOptions = () =>
    options(proveedores, "id_proveedor", "nombre_proveedor");

  usarEfecto(producto, setFormValues, {
    //pasamos objeto con campos adicionales
  });

  const handleInputChange = manejarCambioDeEntrada(setFormValues);
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  const handleSubmit = (event) => {
    event.preventDefault(); // Asegúrate de prevenir la acción predeterminada del formulario
    const entityId = formValues.id_producto;
    manejarEnvio(event, "productList", formValues, null, actualizar, entityId, {
      id_proveedor: Number(formValues.id_proveedor),
      categoria: Number(formValues.categoria),
      precio: parseFloat(formValues.precio).toFixed(2),
      usuario_modificacion: idUsuario,
    });
  };

  const fields = [
    {
      component: InputField,
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
      label: "Codigo de Barras",
      name: "codigo_barras",
      required: true,
      onChange: handleInputChange,
    },

    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      onChange: handleInputChange,
      options: categoriasOptions(),
    },
    {
      component: SelectField,
      label: "Proveedor",
      name: "id_proveedor",
      onChange: handleInputChange,
      options: proveedoresOptions(),
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
      fields={fields}
      esLoading={isLoading}
      entityId={formValues.id_producto}
      title={"Editar Producto"}
      subTitle={"Actualice los datos del producto"}
      icon={FaEdit}
      actions={[{ to: "/productList", label: "Volver", icon: FaBackspace, estilos: "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700" }]}
    />
  );
}
