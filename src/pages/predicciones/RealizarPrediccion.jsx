import React from "react";
import { useNavigate } from "react-router-dom";
import { useVentas } from "../../hooks/useEntities"; // Hook para las ventas

function RealizarPrediccion() {
  const {
    data: response = {},
    isLoading: loadingVentas,
    isError: errorVentas,
  } = useVentas();

  const ventas = response.data || [];

  const navigate = useNavigate();

  if (loadingVentas)
    return <p className="text-center text-gray-600">Cargando datos...</p>;
  if (errorVentas)
    return <p className="text-center text-red-600">Error: {errorVentas}</p>;

  const ventasPorTienda = ventas.reduce((acc, venta) => {
    const tienda = venta.nombre_tienda;
    if (!acc[tienda]) {
      acc[tienda] = [];
    }
    acc[tienda].push(venta);
    return acc;
  }, {});

  const productosPorTienda = Object.keys(ventasPorTienda).map((tienda) => {
    const productos = ventasPorTienda[tienda].flatMap((venta) =>
      venta.detalles.map((detalle) => ({
        nombre_producto: detalle.nombre_producto,
        cantidad: detalle.cantidad,
        fecha_venta: detalle.fecha_venta,
      }))
    );

    const productosAgrupados = productos.reduce((acc, producto) => {
      if (!acc[producto.nombre_producto]) {
        acc[producto.nombre_producto] = [];
      }
      acc[producto.nombre_producto].push({
        cantidad: producto.cantidad,
        fecha_venta: producto.fecha_venta,
      });
      return acc;
    }, {});

    return { tienda, productos: productosAgrupados };
  });

  const handleViewDetails = (producto, detalles) => {
    navigate("/detalles-prediccion", { state: { producto, detalles } });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Productos Más Vendidos por Tienda</h3>
        {productosPorTienda.map((tiendaInfo, index) => (
          <div key={index} className="mb-6">
            <h4 className="text-2xl font-semibold text-gray-700 mb-4">{tiendaInfo.tienda}</h4>
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Producto</th>
                    <th className="px-6 py-3 text-left">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(tiendaInfo.productos).map(([nombreProducto, detalles], idx) => (
                    <tr key={idx} className="hover:bg-gray-100 transition duration-300">
                      <td className="px-6 py-4 border-t text-gray-700">{nombreProducto}</td>
                      <td className="px-6 py-4 border-t">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                          onClick={() => handleViewDetails(nombreProducto, detalles)}
                        >
                          Analizar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RealizarPrediccion;
