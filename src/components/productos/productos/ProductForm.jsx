import { useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { useProductMutations } from "@/hooks/useProductMutations";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { ActionButton } from "@/components/shared/ActionButton";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const initialState = (producto) => ({
  id_producto: producto?.id_producto || "",
  nombre: producto?.nombre || "",
  precio: producto?.precio || "",
  codigo_barras: producto?.codigo_barras || "",
  id_proveedor: producto?.id_proveedor || "",
  categoria: producto?.categoria || "",
  estado: producto?.estado ?? true,
});

function formReducer(state, { name, value }) {
  return { ...state, [name]: value };
}

export default function ProductForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const idUsuario = localStorage.getItem("id_usuario");

  const { crearProducto, actualizarProducto } = useProductMutations();
  const { data: { data: categorias = [] } = {} } = useCategorias();
  const { data: { data: proveedores = [] } = {} } = useProveedores();

  const [formValues, dispatch] = useReducer(
    formReducer,
    state?.producto,
    initialState
  );

  const handleInputChange = (e) => dispatch(e.target);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id_producto, ...data } = formValues;

    const dataToSend = {
      ...data,
      id_proveedor: Number(formValues.id_proveedor),
      categoria: Number(formValues.categoria),
      precio: Number(formValues.precio).toFixed(2),
      usuario_modificacion: idUsuario,
      ...(id_producto ? {} : { usuario_creacion: idUsuario }),
    };

    const mutation = id_producto ? actualizarProducto : crearProducto;
    mutation.mutate(
      id_producto ? { id: id_producto, data: dataToSend } : dataToSend,
      {
        onSuccess: () => navigate("/productList"),
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      {/* Contenedor para el botón y el título */}
      <div className="flex items-center justify-between mb-4">
        <ActionButton
          to="/productList"
          label="Volver"
          icon={FaArrowLeft}
          color="blue"
        />
        <h1 className="text-2xl font-semibold text-blue-900">
          {formValues.id_producto ? "Editar Producto" : "Crear Producto"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          options={categorias.map(({ id_categoria, nombre_categoria }) => ({
            id: id_categoria,
            nombre: nombre_categoria,
          }))}
        />
        <SelectField
          label="Proveedor"
          name="id_proveedor"
          value={formValues.id_proveedor}
          onChange={handleInputChange}
          options={proveedores.map(({ id_proveedor, nombre_proveedor }) => ({
            id: id_proveedor,
            nombre: nombre_proveedor,
          }))}
        />
        <ToggleSwitch
          label="Estado"
          checked={formValues.estado}
          onChange={(value) => dispatch({ name: "estado", value })}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white text-sm px-6 py-2 rounded"
          disabled={crearProducto.isLoading || actualizarProducto.isLoading}
        >
          {formValues.id_producto ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
}
