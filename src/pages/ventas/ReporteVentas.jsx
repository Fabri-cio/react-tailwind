import React from "react";
import { useVentas } from "../../hooks/useVentas"; // Usar el hook que recupera las ventas
import { format } from "date-fns";
import { es } from "date-fns/locale";

function Dashboard() {
  const { ventas, loading, error } = useVentas();
  
  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const isSuperuser = true; // Cambia esto según el estado real del usuario (superusuario)

  // Agrupar ventas por tienda
  const ventasPorTienda = ventas.reduce((acc, venta) => {
    const tienda = venta.nombre_tienda;
    if (!acc[tienda]) {
      acc[tienda] = [];
    }
    acc[tienda].push(venta);
    return acc;
  }, {});

  const totalVentas = Object.keys(ventasPorTienda).map((tienda) => {
    return ventasPorTienda[tienda].reduce((total, venta) => {
      return total + parseFloat(venta.total_venta);
    }, 0);
  });

  const totalProductos = Object.keys(ventasPorTienda).map((tienda) => {
    return ventasPorTienda[tienda].reduce((total, venta) => {
      return total + venta.detalles.reduce((sum, detalle) => sum + detalle.cantidad, 0);
    }, 0);
  });

  const productosMasVendidosPorTienda = Object.keys(ventasPorTienda).map((tienda) => {
    const productos = ventasPorTienda[tienda].flatMap(venta => 
      venta.detalles.map(detalle => ({
        nombre_producto: detalle.nombre_producto,
        cantidad: detalle.cantidad
      }))
    );

    const productosAgrupados = productos.reduce((acc, producto) => {
      if (!acc[producto.nombre_producto]) {
        acc[producto.nombre_producto] = 0;
      }
      acc[producto.nombre_producto] += producto.cantidad;
      return acc;
    }, {});

    return Object.entries(productosAgrupados).sort((a, b) => b[1] - a[1]).slice(0, 5);
  });

  // Ventas Recientes por Tienda
  const ventasRecientesPorTienda = Object.keys(ventasPorTienda).map((tienda) => {
    const ventasOrdenadas = ventasPorTienda[tienda].sort((a, b) => new Date(b.fecha_venta) - new Date(a.fecha_venta));
    return ventasOrdenadas.slice(0, 5); // Mostrar las 5 ventas más recientes
  });

  return (
    <div className="p-8 space-y-6">
      {/* Resumen de Ventas */}
      <div className="grid grid-cols-3 gap-6">
        {Object.keys(ventasPorTienda).map((tienda, index) => (
          <div key={index} className="bg-white p-6 shadow-lg rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-gray-700">{tienda}</h3>
            <p className="text-xl text-green-600">{totalVentas[index].toFixed(2)} Bs.</p>
          </div>
        ))}
      </div>

      {/* Ventas Recientes por Tienda */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Ventas Recientes por Tienda</h3>
        {ventasRecientesPorTienda.map((ventasRecientes, index) => (
          <div key={index} className="mb-6">
            <h4 className="font-semibold text-lg">{Object.keys(ventasPorTienda)[index]}</h4>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Monto Total</th>
                  <th className="px-4 py-2 text-left">Método de Pago</th>
                </tr>
              </thead>
              <tbody>
                {ventasRecientes.map((venta, index) => (
                  <tr key={venta.id_venta} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{format(new Date(venta.fecha_venta), "dd/MM/yyyy", { locale: es })}</td>
                    <td className="px-4 py-2">{venta.total_venta} Bs.</td>
                    <td className="px-4 py-2">{venta.metodo_pago}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* Productos Más Vendidos por Tienda */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Productos Más Vendidos por Tienda</h3>
        {productosMasVendidosPorTienda.map((productos, index) => (
          <div key={index}>
            <h4 className="font-semibold">{Object.keys(ventasPorTienda)[index]}</h4>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Producto</th>
                  <th className="px-4 py-2 text-left">Cantidad Vendida</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(([nombre, cantidad], idx) => (
                  <tr key={idx} className="border-b">
                    <td className="px-4 py-2">{nombre}</td>
                    <td className="px-4 py-2">{cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
