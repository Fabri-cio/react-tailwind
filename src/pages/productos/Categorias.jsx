import React, { useState } from "react";
import {
  FaUtensils,
  FaWineBottle,
  FaCheese,
  FaFish,
  FaDrumstickBite,
  FaConciergeBell,
  FaSearch,
  FaPlus,
  FaBoxOpen
} from "react-icons/fa";
import TarjetaCategoria from "../../components/shared/Card";

// Datos de ejemplo - en una aplicación real esto vendría de tu API
const categoriasIniciales = [
  {
    id: 1,
    nombre: "Carnes y Embutidos",
    icono: FaDrumstickBite,
    descripcion: "Cortes de res, cerdo, pollo y embutidos varios",
    estado: true,
    productos: 24
  },
  {
    id: 2,
    nombre: "Lácteos y Quesos",
    icono: FaCheese,
    descripcion: "Leche, quesos, mantequilla y derivados lácteos",
    estado: true,
    productos: 18
  },
  {
    id: 3,
    nombre: "Pescados y Mariscos",
    icono: FaFish,
    descripcion: "Pescados frescos, congelados y mariscos",
    estado: true,
    productos: 15
  },
  {
    id: 4,
    nombre: "Bebidas",
    icono: FaWineBottle,
    descripcion: "Refrescos, jugos, aguas y bebidas alcohólicas",
    estado: true,
    productos: 32
  },
  {
    id: 5,
    nombre: "Comida Preparada",
    icono: FaConciergeBell,
    descripcion: "Platos listos para calentar y comer",
    estado: true,
    productos: 12
  },
  {
    id: 6,
    nombre: "Abarrotes",
    icono: FaUtensils,
    descripcion: "Productos básicos de despensa",
    estado: true,
    productos: 45
  },
];

const Categorias = () => {
  const [categorias, setCategorias] = useState(categoriasIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("todos");

  const categoriasFiltradas = categorias.filter(categoria => {
    const coincideBusqueda = categoria.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      categoria.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    if (filtroActivo === "todos") return coincideBusqueda;
    if (filtroActivo === "activos") return categoria.estado && coincideBusqueda;
    if (filtroActivo === "inactivos") return !categoria.estado && coincideBusqueda;

    return true;
  });

  const toggleEstado = (id) => {
    setCategorias(categorias.map(cat =>
      cat.id === id ? { ...cat, estado: !cat.estado } : cat
    ));
  };

  const eliminarCategoria = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      setCategorias(categorias.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-600">Administra las categorías de tus productos</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 mt-4 md:mt-0">
          <FaPlus /> Nueva Categoría
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar categorías..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filtroActivo}
              onChange={(e) => setFiltroActivo(e.target.value)}
            >
              <option value="todos">Todas las categorías</option>
              <option value="activos">Activas</option>
              <option value="inactivos">Inactivas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de categorías */}
      <TarjetaCategoria
        categoriasFiltradas={categoriasFiltradas}
        alEliminarCategoria={eliminarCategoria}
        alCambiarEstado={toggleEstado}
      />

      {/* Paginación */}
      {categoriasFiltradas.length > 0 && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              Anterior
            </button>
            <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-blue-600 font-medium">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border-t border-b border-r border-gray-300 bg-white text-gray-500 hover:bg-gray-50 rounded-r-md">
              Siguiente
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Categorias;