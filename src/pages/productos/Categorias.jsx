import { Navigation } from "../../components/shared/Navigation";
import { FaCloudMeatball, FaForumbee, FaMailBulk, FaPlus } from "react-icons/fa";
import Pagination from "../../components/shared/Pagination";
import { useFormEntity } from "../../utils/useFormEntity";
import { useCategorias } from "../../hooks/useEntities";

const Categorias = () => {
  const { todosDatosOpaginacion } = useFormEntity();
  const { items } = todosDatosOpaginacion(useCategorias, true)
  console.log(items)
  return (
    <div className="container mx-auto p-4">
      <Navigation
        title="Categorias"
        subTitle="Administra las categorias de tus productos"
        actions={[
          {
            to: "/createCategoria",
            label: "Crear Categoria",
            icon: FaPlus,
            estilos: "hover:bg-gray-600 hover:text-gray-100 text-black border-2 border-gray-400 rounded-md flex items-center gap-2 transition duration-200 p-2",
          },
        ]}
      />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-2">
        {items.map((categoria) => (
          <div key={categoria.id_categoria} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{categoria.nombre_categoria}</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {40} productos
                </span>
              </div>
              <p className="text-gray-600 mb-4">{categoria.descripcion}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoria.estado === true
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {categoria.estado}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => {/* Add edit functionality */ }}
                >
                  Editar
                </button>
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
