import React from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useInventariosNotificaciones } from "../hooks/useEntities";

ChartJS.register(...registerables);

const HomeMinimalista = () => {
  const { data: notificaciones } = useInventariosNotificaciones({
    all_data: true,
  });
  // 🔹 Datos ficticios
  const kpis = [
    { title: "Total Ventas", value: 12500, color: "green" },
    { title: "Total Compras", value: 8500, color: "blue" },
    { title: "Inventario Total", value: 3200, color: "purple" },
  ];

  const ventasPorTienda = [
    { tienda: "Tienda 1", total: 4000 },
    { tienda: "Tienda 2", total: 3000 },
    { tienda: "Tienda 3", total: 2500 },
    { tienda: "Tienda 4", total: 3000 },
  ];

  const ventasPorDia = [
    { fecha: "2025-09-01", cantidad: 200 },
    { fecha: "2025-09-02", cantidad: 350 },
    { fecha: "2025-09-03", cantidad: 400 },
    { fecha: "2025-09-04", cantidad: 280 },
    { fecha: "2025-09-05", cantidad: 500 },
    { fecha: "2025-09-06", cantidad: 320 },
    { fecha: "2025-09-07", cantidad: 450 },
  ];

  const alertasStock = [
    { producto: "Producto A", almacen: "Almacén 1", stock: 3, limite: 5 },
    { producto: "Producto B", almacen: "Almacén 3", stock: 12, limite: 10 },
    { producto: "Producto C", almacen: "Almacén 2", stock: 0, limite: 5 },
    { producto: "Producto D", almacen: "Almacén 5", stock: 7, limite: 10 },
  ];

  // 🔹 Configuración de gráficos
  const pieData = {
    labels: ventasPorTienda.map((v) => v.tienda),
    datasets: [
      {
        label: "Ventas por tienda",
        data: ventasPorTienda.map((v) => v.total),
        backgroundColor: ["#4ade80", "#60a5fa", "#a78bfa", "#fcd34d"],
        borderWidth: 1,
        borderColor: "#e5e7eb",
      },
    ],
  };

  const lineData = {
    labels: ventasPorDia.map((v) => v.fecha),
    datasets: [
      {
        label: "Ventas por Día",
        data: ventasPorDia.map((v) => v.cantidad),
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: { ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 7 } },
      y: { beginAtZero: true },
    },
  };

  return (
    <main className="container mx-auto space-y-6">
      {/* KPIs */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className={`bg-white shadow rounded-lg border-t-4 border-${kpi.color}-500 flex flex-col items-center justify-center p-4`}
          >
            <h3 className="text-sm font-semibold">{kpi.title}</h3>
            <p className={`text-xl font-bold text-${kpi.color}-600`}>
              {kpi.value.toLocaleString()}
            </p>
          </div>
        ))}
      </section>

      {/* Gráficos en una línea */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie */}
        <div className="bg-white rounded-lg shadow flex flex-col items-center justify-center p-3">
          <h3 className="text-sm font-semibold mb-2 text-center">
            Ventas por Tienda
          </h3>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie
              data={pieData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { boxWidth: 12, padding: 10 },
                  },
                  tooltip: { enabled: true },
                },
              }}
            />
          </div>
        </div>

        {/* Line */}
        <div className="bg-white rounded-lg shadow p-3">
          <h3 className="text-sm font-semibold mb-2 text-center">
            Ventas por Día
          </h3>
          <div className="w-full h-64">
            <Line
              data={lineData}
              options={{ ...lineOptions, maintainAspectRatio: false }}
            />
          </div>
        </div>
      </section>

      {/* Alertas de Stock */}
      <section>
        <h2 className="text-xl font-bold mb-2">Alertas de Stock</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left text-gray-600">Producto</th>
                <th className="p-2 text-left text-gray-600">Almacén</th>
                <th className="p-2 text-left text-gray-600">Stock Actual</th>
                <th className="p-2 text-left text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {notificaciones?.map((alerta, idx) => {
                const estado = alerta.inventario <= 10 ? "Bajo" : "OK"; // ajusta límite si quieres
                const color =
                  estado === "Bajo" ? "text-red-600" : "text-green-600";

                return (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{alerta.titulo}</td>
                    <td className="p-2">{alerta.tipo}</td>
                    <td className="p-2 font-bold">{alerta.inventario}</td>
                    <td className={`p-2 font-semibold ${color}`}>{estado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default HomeMinimalista;
