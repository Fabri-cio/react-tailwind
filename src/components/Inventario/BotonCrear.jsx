import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProducto } from "../../api/producto.api"; // Importa el nuevo método para crear productos
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const BotonCrear = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(true); // Abre el modal
  };

  const handleClose = () => {
    setIsOpen(false); // Cierra el modal
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProducto(data); // Llama a la API para crear el producto
      toast.success("Producto creado con éxito", {
        position: "bottom-center",
        duration: 5000,
        style: {
          background: "#404040",
          color: "#fff",
        },
      });
      setIsOpen(false); // Cierra el modal tras crear el producto
      navigate("/inventarios"); // Redirige a la tabla de productos
    } catch (error) {
      toast.error("Error al crear el producto");
    }
  });

  return (
    <div>
      <button
        onClick={handleClick}
        className="btn-crear bg-green-500 text-white p-2 rounded"
      >
        Crear Producto
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  {...register("nombre", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Nombre del producto"
                />
                {errors.nombre && <span>El nombre es obligatorio</span>}
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  {...register("descripcion")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Descripción del producto"
                />
              </div>

              {/* Código de Barras */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código de Barras
                </label>
                <input
                  type="text"
                  {...register("codigo_barras", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Código de Barras"
                />
                {errors.codigo_barras && (
                  <span>El código de barras es obligatorio</span>
                )}
              </div>

              {/* Select de Categoría */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  {...register("categoria")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Selecciona una categoría</option>
                  {categoria.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Guardar Producto
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonCrear;
