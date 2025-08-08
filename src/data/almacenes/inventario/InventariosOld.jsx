import React from "react";
import { useInventarios } from "../../../hooks/useEntities";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/inventarios/Navigation";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Loading, ErrorMessaje } from "../../../components/shared";
import { useFormEntity } from "../../../utils/useFormEntity";

function Inventarios() {
  const { todosDatosOpaginacion } = useFormEntity();

  const paginacion = todosDatosOpaginacion(useInventarios);

  const {
    currentPage,
    handlePageChange,
    isLoading,
    isError,
    items,
    totalItems,
    hasPagination,
    next,
    previous,
    per_page,
    total_pages,
  } = paginacion;

  const inventarios = items;

  // Manejo de carga y errores
  if (isLoading) return <Loading message="Cargando inventarios..." />;
  if (isError) return <ErrorMessaje message="Error al cargar inventarios." />;

  // Agrupar los inventarios por tienda
  const inventariosPorTienda = {};

  if (Array.isArray(inventarios)) {
    inventarios.forEach((inventario) => {
      if (inventario?.almacen_nombre) {
        const tienda = inventario.almacen_nombre;
        if (!inventariosPorTienda[tienda]) {
          inventariosPorTienda[tienda] = [];
        }
        inventariosPorTienda[tienda].push(inventario);
      }
    });
  }

  // Función para generar el reporte en PDF
  const generarReportePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Reporte de Inventarios por Tienda", 20, 20);

    let currentY = 30;

    // Añadir inventarios por tienda
    Object.keys(inventariosPorTienda).forEach((tienda) => {
      const inventarios = inventariosPorTienda[tienda];

      // Título de la tienda
      doc.setFontSize(14);
      doc.text(tienda, 20, currentY);

      currentY += 10;

      // Tabla de Inventarios
      const rows = inventarios.map((inventario, index) => [
        index + 1,
        inventario.producto_nombre || "Producto no disponible",
        inventario.almacen_nombre || "Almacén no disponible",
        inventario.cantidad || "0",
        inventario.stock_minimo || "0",
        inventario.stock_maximo || "0",
      ]);

      doc.autoTable({
        head: [
          ["#", "Producto", "Lugar", "Cantidad", "Stock Mínimo", "Stock Máximo"],
        ],
        body: rows,
        startY: currentY,
      });

      currentY = doc.lastAutoTable.finalY + 10;
    });

    // Descargar el archivo PDF
    doc.save("reporte-inventarios.pdf");
  };

  const InventarioFila = ({ inventario, index }) => {
    const { id, producto_nombre, almacen_nombre, cantidad, stock_minimo, stock_maximo } =
      inventario;

    const handleDetallesClick = () => {
      navigate(`/registrarMovimiento/${id}`, {
        state: { inventario },
      });
    };

    // Determina la clase para la cantidad según la condición
    const cantidadClase =
      cantidad <= stock_minimo
        ? "text-red-600 font-bold"
        : "text-green-600 font-bold";

    return (
      <tr className="hover:bg-gray-100 transition duration-200">
        <td className="border px-4 py-2 text-center">{index}</td>
        <td className="border px-4 py-2 text-center">
          {producto_nombre || "Producto no disponible"}
        </td>
        <td className="border px-4 py-2 text-center">
          {almacen_nombre || "Almacén no disponible"}
        </td>
        <td className={`border px-4 py-2 text-center ${cantidadClase}`}>
          {cantidad ?? "0"}
        </td>
        <td className="border px-4 py-2 text-center">{stock_minimo ?? "0"}</td>
        <td className="border px-4 py-2 text-center">{stock_maximo ?? "0"}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          <button
            onClick={handleDetallesClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Registrar Movimiento
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="p-4">
      <Navigation />
      <button
        onClick={generarReportePDF}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
      >
        Descargar Reporte de Inventarios en PDF
      </button>
      {Object.keys(inventariosPorTienda).map((tienda) => (
        <div key={tienda} className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {tienda}
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="border px-4 py-2 text-center">#</th>
                  <th className="border px-4 py-2 text-center">Producto</th>
                  <th className="border px-4 py-2 text-center">Lugar</th>
                  <th className="border px-4 py-2 text-center">Cantidad</th>
                  <th className="border px-4 py-2 text-center">Stock Mínimo</th>
                  <th className="border px-4 py-2 text-center">Stock Máximo</th>
                  <th className="border px-4 py-2 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {inventariosPorTienda[tienda].length > 0 ? (
                  inventariosPorTienda[tienda].map((inventario, index) => (
                    <InventarioFila
                      key={inventario.id || index}
                      index={index + 1}
                      inventario={inventario}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-gray-500 py-4 border border-gray-300"
                    >
                      No hay inventarios disponibles en esta tienda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Inventarios;
