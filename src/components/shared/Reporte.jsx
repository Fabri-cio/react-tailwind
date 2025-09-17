import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Navigation } from "./Navigation";
import {
  FaChartLine,
  FaFilePdf,
  FaRegFilePowerpoint,
  FaFileExcel,
} from "react-icons/fa";

ChartJS.register(...registerables);

// Datos de ejemplo (simulados)
const tiendas = ["Tienda 1", "Tienda 2", "Tienda 3", "Tienda 4"];
const almacenes = [
  "Almacén 1",
  "Almacén 2",
  "Almacén 3",
  "Almacén 4",
  "Almacén 5",
];

const generarVentasEjemplo = () => {
  const ventas = [];
  const hoy = new Date("2025-09-01");

  for (let i = 0; i < 30; i++) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() + i);
    const fechaStr = fecha.toISOString().slice(0, 10);

    tiendas.forEach((tienda) => {
      const almacen = almacenes[Math.floor(Math.random() * almacenes.length)];
      const cantidad = Math.floor(Math.random() * 400) + 100;
      ventas.push({ fecha: fechaStr, tienda, almacen, cantidad });
    });
  }

  return ventas;
};

const ventasEjemplo = generarVentasEjemplo();

const ReporteVentas = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [tienda, setTienda] = useState("");
  const [almacen, setAlmacen] = useState("");
  const [vista, setVista] = useState("dia");
  const [tipoGrafico, setTipoGrafico] = useState("line"); // 👈 nuevo estado

  // Filtrado
  const ventasFiltradas = ventasEjemplo.filter((v) => {
    const fechaValida =
      (!fechaInicio || v.fecha >= fechaInicio) &&
      (!fechaFin || v.fecha <= fechaFin);
    const tiendaValida = !tienda || v.tienda === tienda;
    const almacenValido = !almacen || v.almacen === almacen;
    return fechaValida && tiendaValida && almacenValido;
  });

  // Agrupación
  const agruparPor = (datos, tipo) => {
    if (tipo === "dia") {
      return datos.reduce((acc, v) => {
        acc[v.fecha] = (acc[v.fecha] || 0) + v.cantidad;
        return acc;
      }, {});
    }
    if (tipo === "semana") {
      return datos.reduce((acc, v) => {
        const semana = `Semana-${new Date(v.fecha).getWeek()}`;
        acc[semana] = (acc[semana] || 0) + v.cantidad;
        return acc;
      }, {});
    }
    if (tipo === "mes") {
      return datos.reduce((acc, v) => {
        const mes = v.fecha.slice(0, 7);
        acc[mes] = (acc[mes] || 0) + v.cantidad;
        return acc;
      }, {});
    }
    return {};
  };

  const agrupadas = agruparPor(ventasFiltradas, vista);
  const labels = Object.keys(agrupadas).sort();
  const valores = Object.values(agrupadas);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: valores,
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#facc15",
          "#ef4444",
          "#a855f7",
        ],
        borderColor: "#22c55e",
        borderWidth: 2,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <main className="max-w-6xl mx-auto space-y-4 p-4 bg-white">
      {/* Navigation */}
      <Navigation
        title={"Reporte de Ventas"}
        subTitle="Visualiza y filtra las ventas de tu negocio"
        icon={FaChartLine}
        actions={[
          {
            to: "/reportes",
            icon: FaRegFilePowerpoint,
            estilos:
              "text-white hover:text-blue-600 bg-blue-500 hover:bg-blue-600 p-2",
          },
          {
            to: "/reportes",
            icon: FaFilePdf,
            estilos:
              "text-white hover:text-red-600 bg-red-500 hover:bg-red-600 p-2",
          },
          {
            to: "/reportes",
            icon: FaFileExcel,
            estilos:
              "text-white hover:text-green-600 bg-green-500 hover:bg-green-600 p-2",
          },
        ]}
      />

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 bg-gray-50 p-3 rounded-md border">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Inicio</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm bg-white"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Fin</label>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm bg-white"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Tienda</label>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={tienda}
            onChange={(e) => setTienda(e.target.value)}
          >
            <option value="">Todas</option>
            {tiendas.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Almacén</label>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={almacen}
            onChange={(e) => setAlmacen(e.target.value)}
          >
            <option value="">Todos</option>
            {almacenes.map((a, i) => (
              <option key={i} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Vista</label>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={vista}
            onChange={(e) => setVista(e.target.value)}
          >
            <option value="dia">Por Día</option>
            <option value="semana">Por Semana</option>
            <option value="mes">Por Mes</option>
          </select>
        </div>
      </div>

      {/* Layout: gráfica izquierda - tabla derecha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gráfico */}
        <div className="border rounded p-2">
          {/* Selector tipo de gráfico 👇 */}
          <div className="flex justify-end mb-2">
            <select
              className="border rounded px-2 py-1 text-sm bg-white"
              value={tipoGrafico}
              onChange={(e) => setTipoGrafico(e.target.value)}
            >
              <option value="line">Línea</option>
              <option value="bar">Barras</option>
              <option value="pie">Torta</option>
            </select>
          </div>

          {tipoGrafico === "line" && <Line data={chartData} />}
          {tipoGrafico === "bar" && <Bar data={chartData} />}
          {tipoGrafico === "pie" && <Pie data={chartData} />}
        </div>

        {/* Tabla */}
        <div className="border rounded max-h-80 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 text-left">Fecha</th>
                <th className="p-2 text-left">Tienda</th>
                <th className="p-2 text-left">Almacén</th>
                <th className="p-2 text-left">Ventas</th>
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.map((v, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-2">{v.fecha}</td>
                  <td className="p-2">{v.tienda}</td>
                  <td className="p-2">{v.almacen}</td>
                  <td className="p-2 font-semibold">{v.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

// Extensión para semana del año
Date.prototype.getWeek = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

export default ReporteVentas;
