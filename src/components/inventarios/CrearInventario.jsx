import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate
import { useProducts } from "../../hooks/useProducts"; // Hook para obtener productos
import { useAlmacenTiendas } from "@/hooks/useAlmacenTiendas"; // Hook para obtener almacenes
import { useCrearInventario } from "@/hooks/useCrearInventario";

const CrearInventario = () => {
  const navigate = useNavigate(); // Hook para redirigir
  const [inventario, setInventario] = useState({
    producto: "",
    almacen: "",
    cantidad: "",
    stock_minimo: "",
    comentario_modificacion: "",
    usuario_creacion: localStorage.getItem("id_usuario"),
    usuario_modificacion: localStorage.getItem("id_usuario"),
  });

  const {
    data: responseProd = [],
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useProducts();

  const {
    data: responseAlmac = [],
    isLoading: loadingAlmacenes,
    isError: errorAlmacenes,
  } = useAlmacenTiendas();

  // Filtrar datos para evitar claves duplicadas o elementos inválidos
  const productos = (responseProd?.data || []).filter(
    (producto) => producto?.id_producto !== undefined
  );
  const almacenes = (responseAlmac?.data || []).filter(
    (almacen) => almacen?.id_almacen_tienda !== undefined
  );

  const {
    mutate: crearInventario,
    isLoading: isSubmitting,
    isSuccess,
    isError,
  } = useCrearInventario();

  useEffect(() => {
    if (isSuccess) {
      // Redirige a la lista de inventarios cuando la creación sea exitosa
      navigate("/ver_inventario");
    }
  }, [isSuccess, navigate]); // Se ejecuta cuando isSuccess es true

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventario({ ...inventario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...inventario,
      id_producto: parseInt(inventario.producto),
      id_almacen_tienda: parseInt(inventario.almacen),
    };
    crearInventario(dataToSend);
  };

  if (loadingProductos || loadingAlmacenes) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-gray-500">
          Cargando productos y almacenes...
        </p>
      </div>
    );
  }

  if (errorProductos || errorAlmacenes) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg text-red-600">
          Error al cargar productos o almacenes.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-indigo-600">
        Crear Inventario
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección de producto */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Producto</label>
          <select
            name="producto"
            value={inventario.producto}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccionar Producto</option>
            {productos.map((producto) => (
              <option
                key={`producto-${producto.id_producto}`}
                value={producto.id_producto}
              >
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de almacén */}
        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Almacén</label>
          <select
            name="almacen"
            value={inventario.almacen}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Seleccionar Almacén</option>
            {almacenes.map((almacen) => (
              <option
                key={`almacen-${almacen.id_almacen_tienda}`}
                value={almacen.id_almacen_tienda}
              >
                {almacen.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={inventario.cantidad}
            onChange={handleInputChange}
            placeholder="Ingrese la cantidad"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Stock Mínimo</label>
          <input
            type="number"
            name="stock_minimo"
            value={inventario.stock_minimo}
            onChange={handleInputChange}
            placeholder="Ingrese el stock mínimo"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg text-gray-700">Comentario</label>
          <textarea
            name="comentario_modificacion"
            value={inventario.comentario_modificacion}
            onChange={handleInputChange}
            placeholder="Ingrese un comentario (opcional)"
            className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Creando..." : "Crear Inventario"}
          </button>
        </div>
      </form>

      {isSuccess && (
        <p className="text-green-600 text-center">
          Inventario creado con éxito
        </p>
      )}
      {isError && (
        <p className="text-red-600 text-center">Error al crear el inventario</p>
      )}
    </div>
  );
};

export default CrearInventario;
