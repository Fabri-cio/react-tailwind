import useLogout from "../../hooks/useLogout";
import { FaBars, FaUser } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import { ActionButton } from "../shared/ActionButton";

const Navbar = ({ sidebarToggle, setSidebarToggle }) => {
  const logoutUser = useLogout();

  return (
    <nav className="flex justify-between items-center p-4 ml-4 mt-2 mr-2 bg-white-800 text-black border-2 border-gray-400 rounded-lg">
      <ActionButton icon={FaBars} to={"/home"} />
      <ActionButton label={"Mi Aplicacion"} to={"/home"} />

      {/* {sidebarToggle && (
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      )} */}
      <div className="flex items-center">
        <Dropdown
          icon={FaUser}
          options={[
            {
              label: "Mi Perfil",
            },
            {
              label: "Cerrar Sesión",
              action: logoutUser,
            },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
