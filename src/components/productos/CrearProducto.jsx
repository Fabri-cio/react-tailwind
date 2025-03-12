import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import { useCrearProducto } from "@/hooks/useCrearProducto";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { FaPlus } from "react-icons/fa";
import ModalCategoria from "./categorias/ModalCategoria";

const CrearProducto = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [producto, setProducto] = useState({
    nombre: "",
    estado: true,
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

  const {
    mutate: crearProducto,
    isLoading: isSubmitting,
    isSuccess,
    isError,
  } = useCrearProducto();

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

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
        <p className="text-lg text-gray-500">
          Cargando categorías y proveedores...
        </p>
      </div>
    );
  }

  if (errorCategorias || errorProveedores) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-red-600">
          Error al cargar categorías o proveedores.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-200 rounded-lg">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-4">
        Crear Producto
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Nombre del Producto</label>
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleInputChange}
            placeholder="Ingrese el nombre del producto"
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Precio</label>
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleInputChange}
            placeholder="Ingrese el precio"
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        {/* Código de Barras */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Código de Barras</label>
          <input
            type="text"
            name="codigo_barras"
            value={producto.codigo_barras}
            onChange={handleInputChange}
            placeholder="Ingrese el código de barras"
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Categoría</label>
          <div className="flex items-center gap-2">
            <select
              name="categoria"
              value={producto.categoria}
              onChange={handleInputChange}
              className="w-full p-2 text-sm border border-gray-300 rounded"
              required
            >
              <option value="" disabled>Seleccionar Categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-green-700 hover:text-green-400"
              title="Agregar Nueva Categoría"
            >
              <FaPlus className="mr-2" />
            </button>
          </div>
        </div>

        {/* Proveedor */}
        <div>
          <label className="block text-gray-700 font-medium text-sm mb-2">Proveedor</label>
          <select
            name="proveedor"
            value={producto.proveedor}
            onChange={handleInputChange}
            className="w-full p-2 text-sm border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Seleccionar Proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.id_proveedor} value={prov.id_proveedor}>
                {prov.nombre_proveedor}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div className="flex items-center justify-normal">
          <label className="text-sm font-medium text-gray-700 pe-5">Estado del Producto</label>
          <div
            className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
              producto.estado ? "bg-green-500" : "bg-gray-400"
            }`}
            onClick={() => setProducto((prev) => ({ ...prev, estado: !prev.estado }))}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
                producto.estado ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
          <span className="ml-3 text-sm text-gray-700">{producto.estado ? "Activo" : "Inactivo"}</span>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded"
          >
            {isSubmitting ? "Creando..." : "Crear Producto"}
          </button>
        </div>
      </form>

      {isSuccess && <p className="text-green-600 text-center">Producto creado con éxito</p>}
      {isError && <p className="text-red-600 text-center">Error al crear el producto</p>}

      {/* Modal para agregar nueva categoría */}
      <ModalCategoria isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CrearProducto;
