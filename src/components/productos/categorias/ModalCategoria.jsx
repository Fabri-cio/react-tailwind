import React, { useState } from "react";
import { useCrearCategoria } from "@/hooks/useCrearCategoria";

const ModalCategoria = ({ isModalOpen, setIsModalOpen }) => {
  const [formData, setFormData] = useState({ nombre_categoria: "", descripcion: "" });
  const { mutate: crearCategoria, isLoading } = useCrearCategoria();

  const handleClose = () => {
    setIsModalOpen(false);
    setFormData({ nombre_categoria: "", descripcion: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.nombre_categoria.trim() === "") return;

    crearCategoria(formData, { onSuccess: handleClose });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Crear Nueva Categoría
        </h2>
        <input
          type="text"
          name="nombre_categoria"
          value={formData.nombre_categoria}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md shadow-sm mb-4 w-full"
          placeholder="Nombre de la categoría"
        />
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-md shadow-sm mb-4 w-full resize-none h-24"
          placeholder="Descripción de la categoría"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Creando..." : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCategoria;
