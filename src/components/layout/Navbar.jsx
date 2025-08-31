import useLogout from "../../hooks/useLogout";
import { FaBars, FaEllipsisV } from "react-icons/fa";
import Dropdown from "../shared/Dropdown";
import { ActionButton } from "../shared/ActionButton";

const Navbar = ({ toggleSidebar }) => {
  const logoutUser = useLogout();

  return (
    <nav className="sticky z-5 flex justify-between p-4 text-white bg-gray-500 shadow-md">
      <ActionButton
        icon={FaBars}
        onClick={toggleSidebar}
        estilos="p-1 transition-colors duration-200 hover:bg-gray-600 rounded"
      />
      <ActionButton
        label={"Navbar"}
        to={"/home"}
        estilos="transition-colors duration-200 hover:text-gray-200"
      />

      <div className="flex items-center">
        <Dropdown
          icon={FaEllipsisV}
          options={[
            { label: "Mi Perfil" },
            { label: "Cerrar Sesión", action: logoutUser },
          ]}
        />
      </div>
    </nav>
  );
};

export default Navbar;
