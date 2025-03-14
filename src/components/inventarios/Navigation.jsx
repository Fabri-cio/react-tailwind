import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 px-4 bg-gray-100 shadow-md">
      <Link to="/productList">
        <h1 className="font-bold text-2xl">Inventarios</h1>
      </Link>
      <div>
        <Link to="/crear_inventario">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Crear Inventario
          </button>
        </Link>
      </div>
    </div>
  );
}
