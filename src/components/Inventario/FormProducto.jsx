import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createProducto,
  getProducto,
  updateProducto,
  getAllCategorias,
} from "../../api/producto.api";
import { toast } from "react-hot-toast";

const InputField = ({
  label,
  type = "text",
  register,
  name,
  placeholder,
  errors,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      {...register(name, { required: `${label} es obligatorio` })}
      className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
        errors[name] ? "border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />

    {errors[name] && (
      <span className="text-red-500">{errors[name].message}</span>
    )}
  </div>
);

const FormProducto = ({ productoId, onClose }) => {
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Carga las categorías
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const { data } = await getAllCategorias();
        setCategorias(data);
      } catch (error) {
        toast.error("Error al cargar las categorías");
      }
    };
    loadCategorias();
  }, []);

  // Si es actualización, cargar datos del producto
  useEffect(() => {
    const loadProducto = async () => {
      if (!productoId) return;

      try {
        const { data } = await getProducto(productoId);
        setValue("nombre", data.nombre);
        setValue("descripcion", data.descripcion);
        setValue("precio", data.precio);
        setValue("cantidad_stock", data.cantidad_stock);
        setValue("unidad_medida", data.unidad_medida);
        setValue("categoria", data.categoria);
      } catch (error) {
        toast.error("Error al cargar el producto");
      }
    };

    loadProducto();
  }, [productoId, setValue]);

  // Envío del formulario (crear o actualizar)
  const handleFormSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      precio: parseFloat(data.precio),
      cantidad_stock: parseInt(data.cantidad_stock, 10),
      categoria: parseInt(data.categoria, 10),
    };

    try {
      if (productoId) {
        await updateProducto(productoId, payload);
        toast.success("Producto actualizado");
      } else {
        await createProducto(payload);
        toast.success("Producto creado");
      }
      onClose(); // Cierra el modal tras guardar
    } catch (error) {
      toast.error("Error al guardar el producto");
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {productoId ? "Actualizar Producto" : "Crear Producto"}
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <InputField
            label="Nombre"
            register={register}
            name="nombre"
            placeholder="Nombre del producto"
            errors={errors}
          />
          <InputField
            label="Descripción"
            register={register}
            name="descripcion"
            placeholder="Descripción"
            errors={errors}
          />
          <InputField
            label="Precio"
            type="number"
            register={register}
            name="precio"
            placeholder="Precio"
            errors={errors}
          />
          <InputField
            label="Stock"
            type="number"
            register={register}
            name="cantidad_stock"
            placeholder="Stock"
            errors={errors}
          />
          <InputField
            label="Unidad de Medida"
            register={register}
            name="unidad_medida"
            placeholder="Unidad de Medida"
            errors={errors}
          />

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <select
              {...register("categoria", {
                required: "La categoría es obligatoria",
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione una categoría</option>
              {categorias?.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
            {errors.categoria && (
              <span className="text-red-500">{errors.categoria.message}</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              {productoId ? "Guardar cambios" : "Crear Producto"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProducto;
