import React from "react";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdPointOfSale, MdInventory, MdSettings } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

function Sidebar({ sidebarToggle }) {
  return (
    // <div className="w-64 bg-gray-800 fixed h-full px-4 py-2" para desarrollo>
    // cuidado con el espcio entre } w
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-gray-700 fixed h-full px-4 py-2`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/" className="px-3">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"></FaHome>Home
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/punto-de-venta" className="px-3">
            <MdPointOfSale className="inline-block w-6 h-6 mr-2 -mt-2"></MdPointOfSale>
            Punto de Venta
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/inventario" className="px-3">
            <MdInventory className="inline-block w-6 h-6 mr-2 -mt-2"></MdInventory>
            Inventario
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/reportes" className="px-3">
            <TbReportSearch className="inline-block w-6 h-6 mr-2 -mt-2"></TbReportSearch>
            Reportes
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/usuarios" className="px-3">
            <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2"></FaUsers>
            Usuarios
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <Link to="/configuracion" className="px-3">
            <MdSettings className="inline-block w-6 h-6 mr-2 -mt-2"></MdSettings>
            Configuración
            {/*Homecuidado un guion delante puso al medio la casa*/}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
