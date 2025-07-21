import { Navigation } from "../../../components/shared/Navigation";
import {
  FaPlus,
  FaBoxes,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Pagination from "../../../components/shared/Pagination";
import { useFormEntity } from "../../../utils/useFormEntity";
import { useCategorias } from "../../../hooks/useEntities";
import { useNavigate } from "react-router-dom";

const Categorias = () => {
  const navigate = useNavigate();
  const { todosDatosOpaginacion } = useFormEntity();
  const { items } = todosDatosOpaginacion(useCategorias, true);
  console.log(items);
  return (
    <div className="container mx-auto p-4">
      <Navigation
        title="Categorias"
        subTitle="Administra las categorias de tus productos"
        actions={[
          {
            to: "/createProduct",
            icon: FaPlus,
            estilos: "text-white bg-green-600 rounded-full p-2",
          },
        ]}
      />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-2">
        {items.map((categoria) => (
          <div
            key={categoria.id_categoria}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200"
          >
            {/* Imagen de la categoría (opcional) */}
            <div className="h-40 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
              {categoria.imagen ? (
                <img
                  src={categoria.imagen}
                  alt={categoria.nombre_categoria}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-4xl text-gray-400">
                  <FaBoxes />
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {categoria.nombre_categoria}
                    </h2>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        categoria.estado
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {categoria.estado ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {categoria.codigo || "Sin código"}
                  </span>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full whitespace-nowrap">
                  {categoria.cantidad_productos || 0} productos
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2 h-12">
                {categoria.descripcion || "Sin descripción"}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt className="text-blue-400" />
                  <span>
                    {categoria.fecha_creacion
                      ? new Date(categoria.fecha_creacion).toLocaleDateString()
                      : "Sin fecha"}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/editCategoria/${categoria.id_categoria}`)
                    }
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Editar categoría"
                  >
                    <FaEdit className="text-blue-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id_categoria)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Eliminar categoría"
                  >
                    <FaTrash className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default Categorias;
