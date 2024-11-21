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

// Componente genérico para los campos del formulario
const InputField = React.memo(
  ({ label, type = "text", register, name, errors, placeholder, rules }) => {
    return (
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
          <span className="text-red-500">{errors[name]?.message}</span>
        )}
      </div>
    );
  }
);

export function FormProducto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    unregister,
  } = useForm({
    shouldUnregister: true, // Asegura que se desregistren campos no necesarios
  });
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // 1. Consolidación de la lógica de carga de datos (Producto y Categorías)
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Verificar si las categorías ya están en cache
      const cachedCategorias = localStorage.getItem("categorias");
      if (cachedCategorias) {
        setCategorias(JSON.parse(cachedCategorias));
      } else {
        const categoriasData = await getAllCategorias();
        setCategorias(categoriasData.data);
        localStorage.setItem("categorias", JSON.stringify(categoriasData.data)); // Cachear categorías
      }

      // Si existe un ID, cargar datos del producto
      if (id) {
        const productoData = await getProducto(id);
        const producto = productoData.data;

        // Asignar los valores al formulario
        setValue("nombre", producto.nombre);
        setValue("descripcion", producto.descripcion);
        setValue("precio", producto.precio);
        setValue("cantidad_stock", producto.cantidad_stock);
        setValue("unidad_medida", producto.unidad_medida);
        setValue("categoria", producto.categoria.toString()); // Convertir a string para el select
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, [id, setValue]);

  // Cargar los datos del producto y categorías al montar el componente
  useEffect(() => {
    loadData(); // Llamada unificada para cargar datos
  }, [loadData]);

  // 2. Definir un objeto centralizado de reglas de validación
  const validationRules = {
    nombre: { required: "El nombre es obligatorio" },
    descripcion: { required: "La descripción es obligatoria" },
    precio: {
      required: "El precio es obligatorio",
      min: { value: 0.01, message: "El precio debe ser mayor a 0" },
    },
    cantidad_stock: {
      required: "El stock es obligatorio",
      min: { value: 0, message: "El stock no puede ser negativo" },
    },
    unidad_medida: { required: "La unidad de medida es obligatoria" },
    categoria: { required: "La categoría es obligatoria" },
  };

  // 3. Optimización del mapeo de campos del formulario y select de categorías con useMemo
  const categoriasOptions = useMemo(
    () =>
      categorias.map((cat) => (
        <option key={cat.id_categoria} value={cat.id_categoria}>
          {cat.nombre_categoria}
        </option>
      )),
    [categorias]
  );

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        precio: parseFloat(data.precio),
        cantidad_stock: parseInt(data.cantidad_stock, 10),
        categoria: parseInt(data.categoria, 10),
      };

      if (id) {
        await updateProducto(id, payload);
        toast.success("Producto actualizado", { duration: 3000 });
      } else {
        await createProducto(payload);
        toast.success("Producto creado");
      }
      navigate("/almacen/productos"); // Redirigir directamente
    } catch (error) {
      toast.error("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  });

  // Función para eliminar producto
  const handleEliminarProducto = async () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      setLoading(true);
      try {
        await deleteProducto(id);
        toast.success("Producto eliminado con éxito");
        navigate("/almacen/productos"); // Redirigir directamente
      } catch (error) {
        toast.error("Error al eliminar el producto");
      } finally {
        setLoading(false);
      }
    }
  };

  // 4. Definir los campos del formulario en un objeto
  const fields = [
    { name: "nombre", label: "Nombre", placeholder: "Nombre del producto" },
    {
      name: "descripcion",
      label: "Descripción",
      placeholder: "Descripción del producto",
    },
    {
      name: "precio",
      label: "Precio",
      type: "number",
      placeholder: "Precio del producto",
    },
    {
      name: "cantidad_stock",
      label: "Stock",
      type: "number",
      placeholder: "Cantidad en stock",
    },
    {
      name: "unidad_medida",
      label: "Unidad de Medida",
      placeholder: "Unidad de medida",
    },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Actualizar Producto" : "Crear Producto"}
      </h2>
      <form onSubmit={onSubmit}>
        {/* 5. Mapeo de los campos del formulario para evitar repetición */}
        {fields.map(({ name, label, type = "text", placeholder }) => (
          <InputField
            key={name}
            label={label}
            type={type}
            register={register}
            name={name}
            errors={errors}
            placeholder={placeholder}
            rules={validationRules[name]} // Usar reglas de validación centralizadas
          />
        ))}

        {/* Select de Categoría */}
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoria"
            {...register("categoria", {
              required: "La categoría es obligatoria",
            })}
            className={`mt-1 block w-full px-3 py-2 rounded ${
              errors.categoria ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Seleccione una categoría</option>
            {categoriasOptions}
          </select>
          {errors.categoria && (
            <span className="text-red-500">{errors.categoria.message}</span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading} // Deshabilitar el botón mientras se está enviando el formulario
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
              disabled={loading} // Deshabilitar el botón mientras se está procesando la eliminación
            >
              Eliminar Producto
            </button>
          )}
        </div>
      </form>

      {/* Mostrar mensaje de carga */}
      {loading && (
        <div className="mt-4 text-center text-blue-500">Cargando...</div>
      )}
    </div>
  );
}

export default FormProducto;
