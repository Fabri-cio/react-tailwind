import React, { useState, useCallback, lazy, Suspense } from "react";

// Cargar FormProducto de manera dinámica para optimizar el rendimiento
const FormProducto = lazy(() => import("./FormProducto"));

export function Navigation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = useCallback(() => setIsModalOpen(true), []);

  // Función para cerrar el modal
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  // Función para alternar el estado del modal (abierto/cerrado)
  // const toggleModal = useCallback(() => setIsModalOpen(prev => !prev), []);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-indigo-500 px-3 py-2 rounded-lg text-white"
      >
        Crear Producto
      </button>

      {/* Cargar el modal solo si está abierto */}
      {isModalOpen && (
        <Suspense fallback={<div>Cargando...</div>}>
          <FormProducto onClose={closeModal} />
        </Suspense>
      )}
    </div>
  );
}
