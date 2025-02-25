import React from "react";
import { FaUtensils, FaWineBottle, FaCheese, FaFish, FaDrumstickBite, FaConciergeBell } from "react-icons/fa";

const categorias = [
  { id: 1, nombre: "Carnes y Embutidos", icono: FaDrumstickBite },
  { id: 2, nombre: "Lácteos y Quesos", icono: FaCheese },
  { id: 3, nombre: "Pescados y Mariscos", icono: FaFish },
  { id: 4, nombre: "Bebidas", icono: FaWineBottle },
  { id: 5, nombre: "Comida Preparada", icono: FaConciergeBell },
  { id: 6, nombre: "Abarrotes", icono: FaUtensils },
];

const Categorias = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Categorías</h1>

      {/* Grid de categorías */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <categoria.icono className="text-5xl text-blue-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-700">{categoria.nombre}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;
