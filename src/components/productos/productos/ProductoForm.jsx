import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { useProductMutations } from "../../../hooks/useProductMutations";

function ProductoForm() {
  const { state } = useLocation(); // Datos del producto (si estamos editando)
  const navigate = useNavigate();
  const [idUsuario] = useState(localStorage.getItem("id_usuario")); // Se obtiene una sola vez

  const { crearProducto, actualizarProducto } = useProductMutations();

  const { data: responseCat = {} } = useCategorias();
  const { data: responseProv = {} } = useProveedores();

  const categorias = responseCat.data || [];
  const proveedores = responseProv.data || [];

  // Datos iniciales (si estamos editando, obtenemos los datos desde `state`)
  const productoInicial = state?.producto || {
    id_producto: "",
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: true,
  };

  const [formValues, setFormValues] = useState(productoInicial);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formValues,
      id_proveedor: parseInt(formValues.id_proveedor),
      categoria: parseInt(formValues.categoria),
      precio: parseFloat(formValues.precio),
      usuario_modificacion: idUsuario,
    };

    if (!formValues.id_producto) {
      dataToSend.usuario_creacion = idUsuario;
      crearProducto.mutate(dataToSend, {
        onSuccess: () => navigate("/productos"), // Redirige después de éxito
      });
    } else {
      actualizarProducto.mutate(
        { id: formValues.id_producto, data: dataToSend },
        {
          onSuccess: () => navigate("/productos"),
        }
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-4">
        {formValues.id_producto ? "Editar Producto" : "Crear Producto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={formValues.precio}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        {/* Código de Barras */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Código de Barras
          </label>
          <input
            type="text"
            name="codigo_barras"
            value={formValues.codigo_barras}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Categoría
          </label>
          <select
            name="categoria"
            value={formValues.categoria}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Seleccionar Categoría
            </option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Proveedor */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">
            Proveedor
          </label>
          <select
            name="id_proveedor"
            value={formValues.id_proveedor}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Seleccionar Proveedor
            </option>
            {proveedores.map((prov) => (
              <option key={prov.id_proveedor} value={prov.id_proveedor}>
                {prov.nombre_proveedor}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700 pe-5">
            Estado del Producto
          </label>
          <div
            role="switch"
            aria-checked={formValues.estado}
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              formValues.estado ? "bg-green-500" : "bg-red-400"
            }`}
            onClick={() =>
              setFormValues((prevValues) => ({
                ...prevValues,
                estado: !prevValues.estado,
              }))
            }
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
                formValues.estado ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="ml-3 text-sm text-gray-700">
            {formValues.estado ? "Activo" : "Inactivo"}
          </span>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white text-sm px-6 py-2 rounded"
            disabled = {crearProducto.isLoading || actualizarProducto.isLoading}
          >
            {formValues.id_producto ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductoForm;
