import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProducto, updateProducto } from "../../api/producto.api"; // Cambia la importación aquí
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BotonActualizar = ({ productoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // Inicializa useNavigate

  const handleClick = () => {
    setIsOpen(true); // Abre el modal
  };

  const handleClose = () => {
    setIsOpen(false); // Cierra el modal
  };

  const onSubmit = handleSubmit(async (data) => {
    await updateProducto(productoId, data);
    toast.success("Producto Actualizado", {
      position: "bottom-center",
      duration: 5000,
      style: {
        background: "#404040",
        color: "#fff",
      },
    });
    setIsOpen(false); // Cierra el modal tras actualizar
    navigate("/"); // Redirige a la tabla de productos
  });

  useEffect(() => {
    async function loadProducto() {
      if (productoId) {
        const { data } = await getProducto(productoId); // Cambia aquí para usar el nuevo método
        setValue("nombre", data.nombre);
        setValue("categoria", data.categoria.nombre_categoria); // Ajusta según tu API
        setValue("stock", data.stock);
        setValue("precio_venta", data.precio_venta);
      }
    }
    loadProducto();
  }, [productoId, setValue]);

  return (
    <div>
      <button
        onClick={handleClick}
        className="btn-actualizar bg-blue-500 text-white p-2 rounded"
      >
        Actualizar
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Actualizar Producto</h2>
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

              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <input
                  type="text"
                  {...register("categoria", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Categoría"
                />
                {errors.categoria && <span>La categoría es obligatoria</span>}
              </div>

              {/* Cantidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cantidad
                </label>
                <input
                  type="number"
                  {...register("stock", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Cantidad en stock"
                />
                {errors.stock && <span>La cantidad es obligatoria</span>}
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("precio_venta", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Precio de venta"
                />
                {errors.precio_venta && <span>El precio es obligatorio</span>}
              </div>

              {/* Botón para guardar */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </form>

            <button
              onClick={handleClose}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BotonActualizar;
