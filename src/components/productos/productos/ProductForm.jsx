import { useState } from "react";
import { useParams} from "react-router-dom";
import { useProduct, useCategorias, useProveedores } from "../../../hooks/useEntities";
import { useProductMutations } from "../../../hooks/useEntities";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Navigation } from "../../../components/shared/Navigation";
import { FaEdit } from "react-icons/fa";
import { useFormEntity } from "./useFormEntity";

export default function ProductForm() {
  const { id } = useParams();
  const idUsuario = () => localStorage.getItem("id_usuario");
  const {
    options,
    crearEstadoFomulario,
    manejarCambioDeEntrada,
    manejarCambioDeEstado,
    usarEfecto,
    manejarEnvio,
  } = useFormEntity();

  const { crear, actualizar } = useProductMutations();
  const { data: { data: categorias = [] } = {} } = useCategorias();
  const { data: { data: proveedores = [] } = {} } = useProveedores();
  const { data: producto, isLoading } = useProduct(id);

  //configuración del formulario
  const configuracionFormulario = {
    id_producto: "",
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: true,
  };

  //factorizado
  const [formValues, setFormValues] = useState(
    crearEstadoFomulario(configuracionFormulario)
  );

  //factorizado
  const proveedoresOptions = () =>
    options(proveedores, "id_proveedor", "nombre_proveedor");

  //factorizado
  const categoriasOptions = () =>
    options(categorias, "id_categoria", "nombre_categoria");

  usarEfecto(producto, setFormValues, {
    estado: producto?.data?.estado === true,
  });

  //factorizado
  const handleInputChange = manejarCambioDeEntrada(setFormValues);

  //factorizado
  const handleToggleChange = manejarCambioDeEstado(setFormValues);

  //factorizado
  const handleSubmit = (event) => {
    const entityId = formValues.id_producto;
    manejarEnvio( event, "productList", formValues, crear, actualizar, entityId,
      {
        id_proveedor: Number(formValues.id_proveedor),
        categoria: Number(formValues.categoria),
        precio: parseFloat(formValues.precio).toFixed(2),
        usuario_modificacion: idUsuario(),
        ...(entityId ? {} : { usuario_creacion: idUsuario() }),
      }
    );
  };

  if (isLoading) return <p>Cargando producto...</p>;

  return (
    <div className="max-w-4xl bg-gray-400 shadow-lg rounded-lg px-3 py-2 mx-60">
      <Navigation
        title={`${formValues.id_producto ? "Actualizar" : "Crear"} Producto`}
        subTitle="Formulario para actualizar o editar un producto"
        icon={FaEdit}
        actions={[
          {
            to: "/productList",
            label: "Volver",
            icon: FaEdit,
            estilos:
              "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200",
          },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        <InputField
          label="Nombre"
          type="text"
          name="nombre"
          value={formValues.nombre}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Precio"
          type="number"
          name="precio"
          value={formValues.precio}
          onChange={handleInputChange}
          step="0.01"
          required
        />
        <InputField
          label="Código de Barras"
          type="text"
          name="codigo_barras"
          value={formValues.codigo_barras}
          onChange={handleInputChange}
        />
        <SelectField
          label="Categoría"
          name="categoria"
          value={formValues.categoria}
          onChange={handleInputChange}
          options={categoriasOptions()}
        />
        <SelectField
          label="Proveedor"
          name="id_proveedor"
          value={formValues.id_proveedor}
          onChange={handleInputChange}
          options={proveedoresOptions()}
        />
        <ToggleSwitch
          label="Estado"
          checked={formValues.estado}
          onChange={handleToggleChange}
        />
        <ActionButton
          type="submit"
          label={formValues.id_producto ? "Guardar Cambios" : "Crear Producto"}
          estilos="bg-blue-400 hover:bg-blue-800 text-white px-4 py-2 rounded-md flex items-center gap-2 transition duration-200"
          disabled={crear.isLoading || actualizar.isLoading}
        />
      </form>
    </div>
  );
}
