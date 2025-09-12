import React from "react";
import { useDashboard } from "../hooks/useEntities";

const Home = () => {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <p className="p-4">Cargando dashboard...</p>;
  if (error)
    return <p className="p-4 text-red-500">Error al cargar dashboard</p>;

  return (
    <main className="container mx-auto p-6 space-y-6">
      {/* KPIs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Indicadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold">Total de ventas</h3>
            <p className="text-2xl font-bold text-green-600">
              ${data?.total_ventas?.toFixed(2)}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold">Total de compras</h3>
            <p className="text-2xl font-bold text-blue-600">
              ${data?.total_compras?.toFixed(2)}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <h3 className="text-lg font-semibold">Inventario total</h3>
            <p className="text-2xl font-bold text-purple-600">
              {data?.total_stock}
            </p>
          </div>
        </div>
      </section>

      {/* Ventas recientes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Últimas ventas</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Tienda</th>
                <th className="p-3 text-left">Monto</th>
                <th className="p-3 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {data?.ventas_recientes?.map((venta) => (
                <tr key={venta.id} className="border-t">
                  <td className="p-3">{venta.tienda__nombre}</td>
                  <td className="p-3">${venta.total_venta}</td>
                  <td className="p-3">
                    {new Date(venta.fecha_creacion).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compras recientes */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Últimas compras</h2>
        <ul className="bg-white shadow-md rounded-xl divide-y">
          {data?.compras_recientes?.map((compra) => (
            <li key={compra.id} className="p-3 flex justify-between">
              <span>{compra.almacen__nombre}</span>
              <span className="font-bold">${compra.total_compra}</span>
              <span className="text-gray-500">
                {new Date(compra.fecha_creacion).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Alertas de stock */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Alertas de stock</h2>
        {data?.alertas_stock?.length === 0 ? (
          <p className="text-gray-500">✅ Todo el stock está en orden</p>
        ) : (
          <ul className="bg-white shadow-md rounded-xl divide-y">
            {data?.alertas_stock?.map((alerta, idx) => (
              <li key={idx} className="p-3 flex justify-between text-red-600">
                <span>{alerta.producto}</span>
                <span>{alerta.stock} unidades</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default Home;
