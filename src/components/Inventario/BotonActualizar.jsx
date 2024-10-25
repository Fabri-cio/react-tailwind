import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  getProducto,
  updateProducto,
  getAllCategorias,
} from "../../api/producto.api"; // Cambia la importación aquí
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BotonActualizar = ({ productoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState([]); // Inicializa el estado para categorias

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
    // Convierte los valores necesarios a los tipos correctos
    const payload = {
      ...data,
      precio: parseFloat(data.precio), // Convierte precio a número
      cantidad_stock: parseInt(data.cantidad_stock, 10), // Convierte cantidad_stock a número
      categoria: parseInt(data.categoria, 10), // Convierte id_categoria a número
    };
    console.log("Datos a enviar:", payload); // Imprime los datos aquí
    await updateProducto(productoId, payload);
    toast.success("Producto Actualizado", {
      position: "bottom-center",
      duration: 5000,
      style: {
        background: "#404040",
        color: "#fff",
      },
    });
    setIsOpen(false); // Cierra el modal tras actualizar
    navigate("/inventario/productos"); // Redirige a la tabla de productos
  });

  useEffect(() => {
    async function loadProducto() {
      if (productoId) {
        const { data } = await getProducto(productoId); // Cambia aquí para usar el nuevo método
        setValue("nombre", data.nombre);
        setValue("descripcion", data.descripcion);
        setValue("precio", data.precio);
        setValue("cantidad_stock", data.cantidad_stock);
        setValue("unidad_medida", data.unidad_medida);
        setValue("categoria", data.categoria);
        console.log(data);
      }
    }
    loadProducto();
  }, [productoId, setValue]);

  useEffect(() => {
    async function loadCategorias() {
      const { data } = await getAllCategorias(); // Obtén las categorías
      console.log(data); // Verifica si las categorías se cargan correctamente
      setCategorias(data); // Almacena las categorías en el estado
      console.log(data);
    }
    loadCategorias();
  }, []);

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

              {/* Descripcion */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripcion
                </label>
                <textarea
                  type="text"
                  {...register("descripcion", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Descripcion"
                />
                {errors.descripcion && <span>El texto es obligatorio</span>}
              </div>

              {/* precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  {...register("precio", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Codigo de Barras"
                />
                {errors.precio && <span>El precio es obligatorio</span>}
              </div>

              {/* stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  {...register("cantidad_stock", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Stock"
                />
                {errors.precio && <span>El stock es obligatorio</span>}
              </div>

              {/* unidad de medida */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Unidad de Medida
                </label>
                <input
                  type="text"
                  {...register("unidad_medida", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Unidad de Medida"
                />
                {errors.precio && (
                  <span>La unidad de Medida es obligatorio</span>
                )}
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  {...register("categoria", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="id_categoria">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id_categoria}
                      value={categoria.id_categoria}
                    >
                      {categoria.nombre_categoria}
                    </option>
                  ))}
                </select>
                {errors.id_categoria && (
                  <span>La categoría es obligatoria</span>
                )}
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
