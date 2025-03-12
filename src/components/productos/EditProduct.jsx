import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { useActualizarProducto } from "@/hooks/useActualizarProducto";

function EditProduct() {
  const { state } = useLocation(); // Datos del producto desde la navegación
  const navigate = useNavigate();

  const {
    data: responseCat = {},
    isLoading: loadingCategorias,
    isError: errorCategorias,
  } = useCategorias();

  const {
    data: responseProv = {},
    isLoading: loadingProveedores,
    isError: errorProveedores,
  } = useProveedores();

  const categorias = responseCat.data || [];
  const proveedores = responseProv.data || [];

  // Datos iniciales del producto
  const producto = state?.producto || {
    id_producto: "",
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: true,
  };

  const [formValues, setFormValues] = useState(producto);

  const {
    mutate: actualizarProducto,
    isSuccess,
    isLoading,
  } = useActualizarProducto();

  // Actualizar el formulario con los IDs correctos de proveedor y categoría
  useEffect(() => {
    if (categorias.length > 0 && proveedores.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        id_proveedor:
          proveedores.find(
            (prov) => prov.nombre_proveedor === prevValues.nombre_proveedor
          )?.id_proveedor || "",
        id_categoria:
          categorias.find(
            (cat) => cat.nombre_categoria === prevValues.nombre_categoria
          )?.id_categoria || "",
      }));
    }
  }, [categorias, proveedores]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/productos");
    }
  }, [isSuccess, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormValues({ ...formValues, [name]: checked });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: parseInt(value, 10) });
  };

  const handleEstadoToggle = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      estado: !prevValues.estado,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formValues); // Verifica los valores aquí
    const { id_producto, ...data } = formValues;

    // Añadir usuario_modificacion
    const dataToSend = {
      ...data,
      usuario_modificacion: localStorage.getItem("id_usuario"), // Añadir usuario_modificacion
    };

    actualizarProducto({
      id: parseInt(id_producto, 10),
      data: dataToSend,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-4">
        {formValues.id_producto ? "Editar Producto" : "Crear Producto"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* precio */}
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
            value={formValues.id_categoria}
            onChange={handleSelectChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Seleccinar Categoria
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
            onChange={handleSelectChange}
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

        {/* Toggle Switch para Estado */}
        <div className="flex items-center justify-normal">
          <label className="text-sm font-medium text-gray-700 pe-5">
            Estado del Producto
          </label>
          <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              formValues.estado ? "bg-green-500" : "bg-red-400"
            }`}
            onClick={handleEstadoToggle}
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white text-sm px-6 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
