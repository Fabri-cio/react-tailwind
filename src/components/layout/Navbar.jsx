import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const logoutUser = useLogout();

  return (
    <nav className="flex justify-between items-center p-4 m-2 ml-4 bg-white-800 text-black border-2 border-gray-400 rounded-lg">
      <button>☰</button>
      <div>
        <Link to="/">MiAplicación</Link>
      </div>

      {sidebarToggle && (
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      )}
      <div>
        <Link to="/">Inicio</Link>
        <Link to="/acerca">Acerca</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
    </nav>
  );
};

export default Navbar;
