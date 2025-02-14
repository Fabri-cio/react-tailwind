import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCategorias } from "@/hooks/useCategorias";
import { useProveedores } from "@/hooks/useProveedores";
import { useActualizarProducto } from "@/hooks/useActualizarProducto";

function FormProducto() {
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
      <h1 className="text-4xl font-semibold text-center text-indigo-700 mb-6">
        {formValues.id_producto ? "Editar Producto" : "Crear Producto"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Estado</label>
          <input
            type="checkbox"
            name="estado"
            checked={formValues.estado}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>{formValues.estado ? "Activo" : "Inactivo"}</span>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Proveedor
          </label>
          <select
            name="id_proveedor"
            value={formValues.id_proveedor}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
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

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Categoría
          </label>
          <select
            name="categoria"
            value={formValues.id_categoria}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Seleccinar Categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Precio</label>
          <input
            type="number"
            name="precio"
            value={formValues.precio}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Código de Barras
          </label>
          <input
            type="text"
            name="codigo_barras"
            value={formValues.codigo_barras}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProducto;
