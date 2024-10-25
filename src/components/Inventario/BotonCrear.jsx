import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProducto, getAllCategorias } from "../../api/producto.api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BotonCrear = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      precio: parseFloat(data.precio),
      cantidad_stock: parseInt(data.cantidad_stock, 10),
      categoria: parseInt(data.categoria, 10),
    };
    try {
      await createProducto(payload);
      toast.success("Producto creado con éxito", {
        position: "bottom-center",
        duration: 5000,
        style: {
          background: "#404040",
          color: "#fff",
        },
      });
      setIsOpen(false);
      navigate("/inventarios");
    } catch (error) {
      toast.error("Error al crear el producto");
    }
  });

  useEffect(() => {
    async function loadCategorias() {
      const { data } = await getAllCategorias();
      setCategorias(data);
    }
    loadCategorias();
  }, []);

  return (
    <div>
      <button onClick={handleClick} className="btn-crear bg-green-500 text-white p-2 rounded">
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

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  {...register("precio", { required: true })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Precio"
                />
                {errors.precio && <span>El precio es obligatorio</span>}
              </div>

              {/* Stock */}
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
                {errors.cantidad_stock && <span>El stock es obligatorio</span>}
              </div>

              {/* Unidad de Medida */}
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
                {errors.unidad_medida && <span>La unidad de medida es obligatoria</span>}
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
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((cat) => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nombre_categoria}
                    </option>
                  ))}
                </select>
                {errors.categoria && <span>La categoría es obligatoria</span>}
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Crear Producto
                </button>
                <button type="button" onClick={handleClose} className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md">
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
