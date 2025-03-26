import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useDetaVentas } from "../../hooks/useEntities";

function DetalleVentas() {
  const {
    data: response = {},
    isLoading: loadingDetalleVentas,
    isError: errorDetalleVentas,
  } = useDetaVentas();

  const detalleVentas = response.data || [];

  console.log("Productos vendidos cargados:", detalleVentas);

  if (loadingDetalleVentas) return <p className="text-center text-gray-600">Cargando productos vendidos...</p>;
  if (errorDetalleVentas) return <p className="text-center text-red-600">Error: {errorDetalleVentas}</p>;

  // Agrupar las ventas por tienda
  const ventasPorTienda = detalleVentas.reduce((acc, producto) => {
    if (!acc[producto.nombre_tienda]) {
      acc[producto.nombre_tienda] = [];
    }
    acc[producto.nombre_tienda].push(producto);
    return acc;
  }, {});

  const DetalleVentasFila = ({ productosVendidos, index }) => {
    const {
      id_detalle_venta,
      fecha_venta,
      nombre_producto,
      nombre_tienda,
      cantidad,
      precio_unitario,
      subtotal,
      descuento_unitario,
    } = productosVendidos;

    const formatDate = fecha_venta
      ? format(new Date(fecha_venta), "dd'/'MMMMMMMMMMM'/'yyyy", { locale: es })
      : "Fecha inválida";

    return (
      <tr className="hover:bg-gray-100 transition duration-200">
        <td className="border px-4 py-2 text-center">{index}</td>
        <td className="border px-4 py-2">{nombre_producto}</td>
        <td className="border px-4 py-2 text-center">{formatDate}</td>
        <td className="border px-4 py-2 text-center">{cantidad}</td>
        <td className="border px-4 py-2 text-center">{precio_unitario}</td>
        <td className="border px-4 py-2 text-center">{descuento_unitario}</td>
        <td className="border px-4 py-2 text-center">{subtotal}</td>
      </tr>
    );
  };

  return (
    <div className="p-8 space-y-6">
      {/* Título principal de la sección */}
      <h1 className="text-4xl font-extrabold text-center text-blue-800">Productos Vendidos</h1>
      
      {Object.entries(ventasPorTienda).map(([tienda, ventasPorUnaTienda], index) => (
        <div
          key={index}
          className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
        >
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{tienda}</h3>
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border px-4 py-2 text-center">#</th>
                <th className="border px-4 py-2 text-center">Producto</th>
                <th className="border px-4 py-2 text-center">Fecha</th>
                <th className="border px-4 py-2 text-center">Cantidad</th>
                <th className="border px-4 py-2 text-center">Precio Bs.</th>
                <th className="border px-4 py-2 text-center">Descuento Bs.</th>
                <th className="border px-4 py-2 text-center">Total Bs.</th>
              </tr>
            </thead>
            <tbody>
              {ventasPorUnaTienda.map((producto, idx) => (
                <DetalleVentasFila
                  key={producto.id_detalle_venta || idx}
                  index={idx + 1}
                  productosVendidos={producto}
                />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default DetalleVentas;
