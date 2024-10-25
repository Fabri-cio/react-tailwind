import React, { useState } from "react";
import { FaCocktail, FaHome, FaSwatchbook, FaUsers } from "react-icons/fa";
import { FaChampagneGlasses, FaLeftLong, FaRightLong } from "react-icons/fa6";
import { MdPointOfSale, MdInventory, MdSettings } from "react-icons/md";
import { TbBread, TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

function Sidebar({ sidebarToggle }) {
  const [isInventoryOpen, setInventoryOpen] = useState(false);

  return (
    // <div className="w-64 bg-gray-800 fixed h-full px-4 py-2" para desarrollo>
    // cuidado con el espcio entre } w
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-blue-950 fixed h-full px-4 py-2`}
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
          <Link
            to="/inventario"
            className="px-3"
            onClick={() => setInventoryOpen(!isInventoryOpen)}
          >
            {/*Home cuidado un guion delante puso al medio la casa*/}
            <MdInventory className="inline-block w-6 h-6 mr-2 -mt-2"></MdInventory>
            Inventario
          </Link>
          {isInventoryOpen && (
            <ul className="pl-4">
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario/productos" className="px-7">
                  <FaCocktail className="inline-block w-5 h-5 mr-2 -mt-2" />
                  G. Productos{" "}
                </Link>
              </li>
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario/entradas" className="px-7">
                  <FaRightLong className="inline-block w-5 h-5 mr-2 -mt-2" />
                  Entradas
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario/salidas" className="px-7">
                  <FaLeftLong className="inline-block w-5 h-5 mr-2 -mt-2" />
                  Salidas
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario" className="px-7">
                  <FaSwatchbook className="inline-block w-5 h-5 mr-2 -mt-2" />
                  Stock
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario" className="px-7">
                  <FaChampagneGlasses className="inline-block w-5 h-5 mr-2 -mt-2" />
                  Categorias y sub
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario/reportes" className="px-7">
                  B. Filtrado
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/inventario/reportes" className="px-7">
                  Reportes
                </Link>
              </li>
            </ul>
          )}
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
