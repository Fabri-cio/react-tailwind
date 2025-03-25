import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { useProduct } from "../../../hooks/useEntities";
import { useProductMutations } from "../../../hooks/useEntities";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { ActionButton } from "@/components/shared/ActionButton";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idUsuario = useMemo(() => localStorage.getItem("id_usuario"), []);

  const { crear, actualizar } = useProductMutations();
  const { data: { data: categorias = [] } = {} } = useCategorias();
  const { data: { data: proveedores = [] } = {} } = useProveedores();
  const { data: producto, isLoading } = useProduct(id);

  const [formValues, setFormValues] = useState({
    id_producto: "",
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: true,
  });

  const categoriasOptions = useMemo(
    () =>
      categorias.map(({ id_categoria, nombre_categoria }) => ({
        id: id_categoria,
        nombre: nombre_categoria,
      })),
    [categorias]
  );

  const proveedoresOptions = useMemo(
    () =>
      proveedores.map(({ id_proveedor, nombre_proveedor }) => ({
        id: id_proveedor,
        nombre: nombre_proveedor,
      })),
    [proveedores]
  );

  useEffect(() => {
    if (producto?.data) {
      const {
        id_producto,
        nombre,
        precio,
        codigo_barras,
        id_proveedor,
        categoria,
        estado,
      } = producto.data;
      setFormValues({
        id_producto: id_producto || "",
        nombre: nombre || "",
        precio: precio || "",
        codigo_barras: codigo_barras || "",
        id_proveedor: id_proveedor || "",
        categoria: categoria || "",
        estado: estado ?? true,
      });
    }
  }, [producto]);

  const handleInputChange = useCallback((e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleToggleChange = (value) => {
    setFormValues((prevState) => ({ ...prevState, estado: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id_producto, ...data } = formValues;

    const dataToSend = {
      ...data,
      id_proveedor: Number(formValues.id_proveedor),
      categoria: Number(formValues.categoria),
      precio: parseFloat(formValues.precio).toFixed(2),
      usuario_modificacion: idUsuario,
      ...(id_producto ? {} : { usuario_creacion: idUsuario }),
    };

    const mutation = id_producto ? actualizar : crear;
    mutation.mutate(
      { id: id_producto || undefined, data: dataToSend },
      { onSuccess: () => navigate("/productList") }
    );
  };

  if (isLoading) return <p>Cargando producto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
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
          options={categoriasOptions}
        />
        <SelectField
          label="Proveedor"
          name="id_proveedor"
          value={formValues.id_proveedor}
          onChange={handleInputChange}
          options={proveedoresOptions}
        />
        <ToggleSwitch
          label="Estado"
          checked={formValues.estado}
          onChange={handleToggleChange}
        />
        <ActionButton
          type="submit"
          label={formValues.id_producto ? "Guardar Cambios" : "Crear Producto"}
          color="blue"
          disabled={crear.isLoading || actualizar.isLoading}
        />
      </form>
    </div>
  );
}
