import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  createProducto,
  getProducto,
  updateProducto,
  getAllCategorias,
  deleteProducto,
} from "@/api/producto.api";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

// Componente reutilizable para campos de entrada
const InputField = React.memo(
  ({ label, type = "text", register, name, errors, placeholder, rules }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 rounded ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  )
);

// Componente principal del formulario
export function FormProducto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ shouldUnregister: true });

  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // Lógica de carga de datos (categorías y producto)
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Verificar si las categorías ya están en caché
      const cachedCategorias = localStorage.getItem("categorias");
      if (cachedCategorias) {
        setCategorias(JSON.parse(cachedCategorias));
      }

      // Cargar categorías desde la API y actualizar el caché
      const { data: categoriasData } = await getAllCategorias();
      setCategorias(categoriasData);
      localStorage.setItem("categorias", JSON.stringify(categoriasData));

      // Cargar datos del producto si se edita
      if (id) {
        const { data: producto } = await getProducto(id);
        setValue("nombre", producto.nombre);
        setValue("marca", producto.marca);
        setValue("precio", producto.precio);
        setValue("stock", producto.stock);
        setValue("codigo_barras", producto.codigo_barras);
        setValue("categoria", producto.categoria.toString());
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, [id, setValue]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reglas de validación
  const validationRules = {
    nombre: { required: "El nombre es obligatorio" },
    marca: { required: "La marca es obligatoria" }, // Nueva regla
    precio: {
      required: "El precio es obligatorio",
      min: { value: 0.01, message: "El precio debe ser mayor a 0" },
      pattern: {
        value: /^\d+(\.\d{1,2})?$/, // Permitimos hasta dos decimales
        message: "El precio debe ser un número válido",
      },
    },
    stock: {
      required: "El stock es obligatorio",
      min: { value: 0, message: "El stock no puede ser negativo" },
    },
    categoria: { required: "La categoría es obligatoria" },
    codigo_barras: {
      required: "El código de barras es obligatorio",
      pattern: {
        value: /^[a-zA-Z0-9\-]+$/,
        message: "Código de barras inválido",
      },
    },
  };

  // Opciones de categorías con memoización
  const categoriasOptions = useMemo(
    () =>
      categorias.map((cat) => (
        <option key={cat.id_categoria} value={cat.id_categoria}>
          {cat.nombre_categoria}
        </option>
      )),
    [categorias]
  );

  // Manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        precio: parseFloat(data.precio).toFixed(2),
        cantidad_stock: parseInt(data.cantidad_stock, 10),
        categoria: parseInt(data.categoria, 10),
      };

      if (id) {
        await updateProducto(id, payload);
        toast.success("Producto actualizado con éxito");
      } else {
        await createProducto(payload);
        toast.success("Producto creado con éxito");
      }

      navigate("/productos");
    } catch (error) {
      toast.error("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  });

  // Eliminar producto
  const handleEliminarProducto = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setLoading(true);
      try {
        await deleteProducto(id);
        toast.success("Producto eliminado con éxito");
        navigate("/productos");
      } catch (error) {
        toast.error("Error al eliminar el producto");
      } finally {
        setLoading(false);
      }
    }
  };

  const fields = [
    { name: "nombre", label: "Nombre", placeholder: "Nombre del producto" },
    { name: "marca", label: "Marca", placeholder: "Marca del producto" }, // Nuevo campo
    {
      name: "precio",
      label: "Precio",
      type: "number",
      placeholder: "Precio del producto",
    },
    {
      name: "stock",
      label: "Stock",
      type: "number",
      placeholder: "Cantidad en stock",
    },
    {
      name: "codigo_barras",
      label: "Código de Barras",
      placeholder: "Código único",
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Actualizar Producto" : "Crear Producto"}
      </h2>
      <form onSubmit={onSubmit}>
        {/* Renderización de los campos del formulario */}
        {fields.map(({ name, label, type = "text", placeholder }) => (
          <InputField
            key={name}
            label={label}
            type="text"
            register={register}
            name={name}
            errors={errors}
            placeholder={placeholder}
            rules={validationRules[name]}
          />
        ))}

        {/* Select de categorías */}
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoria"
            {...register("categoria", validationRules.categoria)}
            className={`mt-1 block w-full px-3 py-2 rounded ${
              errors.categoria ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Seleccione una categoría</option>
            {categoriasOptions}
          </select>
          {errors.categoria && (
            <span className="text-red-500 text-sm">
              {errors.categoria.message}
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : id
              ? "Actualizar Producto"
              : "Crear Producto"}
          </button>
          {id && (
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleEliminarProducto}
              disabled={loading}
            >
              Eliminar Producto
            </button>
          )}
        </div>
      </form>

      {loading && (
        <div className="mt-4 text-center text-blue-500">Cargando...</div>
      )}
    </div>
  );
}

export default FormProducto;
