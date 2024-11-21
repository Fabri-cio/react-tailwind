import React, { useState } from "react";
import {
  FaBox,
  FaCocktail,
  FaHome,
  FaSwatchbook,
  FaUsers,
} from "react-icons/fa";
import { FaChampagneGlasses, FaLeftLong, FaRightLong } from "react-icons/fa6";
import { MdPointOfSale, MdInventory, MdSettings } from "react-icons/md";
import { TbBread, TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

function Sidebar({ sidebarToggle }) {
  const [isAlmacenOpen, setAlmacenOpen] = useState(false);
  const [isVentasOpen, setVentasOpen] = useState(false);

  return (
    // <div className="w-64 bg-gray-800 fixed h-full px-4 py-2" para desarrollo>
    // cuidado con el espcio entre } w
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 bg-gray-800 fixed h-full px-4 py-2`}
    >
      <div className="my-2 mb-4">
        <h1 className="text-2x text-white font-bold">Conquistador Admin</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-gray-500 py-2">
          <button
            className="px-3 w-full text-left"
            onClick={() => setAlmacenOpen(!isAlmacenOpen)}
          >
            <FaBox className="inline-block w-6 h-6 mr-2 -mt-2" />
            Almacen
          </button>
          {isAlmacenOpen && (
            <ul className="pl-4">
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Categoria
                </Link>
              </li>
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Presentacion
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Marca
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="/almacen/productos" className="px-7">
                  Producto
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Codigo de Barras
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <button
            className="px-3 w-full text-left"
            onClick={() => setVentasOpen(!isVentasOpen)}
          >
            <FaBox className="inline-block w-6 h-6 mr-2 -mt-2" />
            Ventas
          </button>
          {isVentasOpen && (
            <ul className="pl-4">
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Realizar Ventas
                </Link>
              </li>
              <li className=" rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Ver Ventas
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Ventas por fecha
                </Link>
              </li>
              <li className="rounded hover:shadow hover:bg-blue-950 py-2">
                <Link to="" className="px-7">
                  Informes Mensuales
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
