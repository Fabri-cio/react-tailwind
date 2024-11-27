import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 px-4 bg-gray-100 shadow-md">
      <Link to="/usuarios/lista">
        <h1 className="font-bold text-2xl">Usuarios</h1>
      </Link>

      <div>
        <Link to="/usuarios/formUsuario">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Crear Usuario
          </button>
        </Link>
      </div>
    </div>
  );
}
