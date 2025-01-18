import React from "react";
import { useNavigate } from "react-router-dom";
import { useVentas } from "../../hooks/useVentas"; // Hook para las ventas
import { format } from "date-fns";
import { es } from "date-fns/locale";

function RealizarPrediccion() {
  const {
    data: response = {},
    isLoading: loadingVentas,
    isError: errorVentas,
  } = useVentas();

  const ventas = response.data || [];

  const navigate = useNavigate();

  if (loadingVentas) return <p>Cargando datos...</p>;
  if (errorVentas) return <p>Error: {errorVentas}</p>;

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
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Productos Más Vendidos por Tienda
        </h3>
        {productosPorTienda.map((tiendaInfo, index) => (
          <div key={index}>
            <h4 className="font-semibold">{tiendaInfo.tienda}</h4>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(tiendaInfo.productos).map(
                  ([nombreProducto, detalles], idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2">{nombreProducto}</td>
                      <td className="px-4 py-2">
                        <button
                          className="text-blue-500 underline"
                          onClick={() =>
                            handleViewDetails(nombreProducto, detalles)
                          }
                        >
                          Predecir
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RealizarPrediccion;
