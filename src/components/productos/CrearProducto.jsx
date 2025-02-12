import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import { useCrearProducto } from "../../hooks/useCrearProducto";
import { useCategorias } from "../../hooks/useCategorias";
import { useProveedores } from "../../hooks/useProveedores";

const CrearProducto = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    proveedor: "",
    codigo_barras: "",
    usuario_creacion: localStorage.getItem("id_usuario"),
    usuario_modificacion: localStorage.getItem("id_usuario"),
  });

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

  const { mutate: crearProducto, isLoading: isSubmitting, isSuccess, isError } = useCrearProducto();

  useEffect(() => {
    if (isSuccess) {
      // Redirige a la lista de productos cuando la creación sea exitosa
      navigate("/productos");
    }
  }, [isSuccess, navigate]); // Se ejecuta cuando isSuccess es true

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...producto,
      categoria: parseInt(producto.categoria),
      id_proveedor: parseInt(producto.proveedor),
    };
    crearProducto(dataToSend);
  };

  if (loadingCategorias || loadingProveedores) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500">Cargando categorías y proveedores...</p>
      </div>
    );
  }

  if (errorCategorias || errorProveedores) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-red-600">Error al cargar categorías o proveedores.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-indigo-600">Crear Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del producto"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            placeholder="Ingrese el precio"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Código de Barras</label>
          <input
            type="text"
            name="codigo_barras"
            value={producto.codigo_barras}
            onChange={handleInputChange}
            placeholder="Ingrese el código de barras"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Selección de categoría */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Categoría</label>
          <select
            name="categoria"
            value={producto.categoria}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Seleccionar Categoría</option>
            {categorias?.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de proveedor */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Proveedor</label>
          <select
            name="proveedor"
            value={producto.proveedor}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="" disabled>Seleccionar Proveedor</option>
            {proveedores?.map((proveedor) => (
              <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                {proveedor.nombre_proveedor}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Creando..." : "Crear Producto"}
          </button>
        </div>
      </form>

      {isSuccess && <p className="text-green-600 text-center">Producto creado con éxito</p>}
      {isError && <p className="text-red-600 text-center">Error al crear el producto</p>}
    </div>
  );
};

export default CrearProducto;
