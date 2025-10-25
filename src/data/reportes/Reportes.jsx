import { useState, useMemo } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Navigation } from "../../components/shared/Navigation";
import FormattedDate from "../../components/shared/FormattedDate";
import {
  FaChartLine,
  FaFilePdf,
  FaRegFilePowerpoint,
  FaFileExcel,
} from "react-icons/fa";
import { useFormEntity } from "../../utils/useFormEntity";
import {
  useVentasReporte,
  useComprasReporte,
  useAlmacenesSelect,
} from "../../hooks/useEntities";

ChartJS.register(...registerables);

const Reportes = () => {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [almacen, setAlmacen] = useState("");
  const [vista, setVista] = useState("dia");
  const [tipoGrafico, setTipoGrafico] = useState("line");
  const [tipoReporte, setTipoReporte] = useState("ventas"); // nuevo: ventas o compras

  // 🧠 Filtros memoizados
  const filtros = useMemo(() => {
    const f = {};
    if (fechaInicio) f.fecha_inicio = fechaInicio;
    if (fechaFin) f.fecha_fin = fechaFin;
    if (almacen) f.almacen = almacen;
    return f;
  }, [fechaInicio, fechaFin, almacen]);

  // ⚡ Hook dinámico según tipo de reporte
  const reporteData =
    tipoReporte === "ventas"
      ? useVentasReporte(
          {
            filters: filtros,
            all_data: !!(fechaInicio || fechaFin || almacen),
            page: 1,
            per_page: 10,
          },
          true
        )
      : useComprasReporte(
          {
            filters: filtros,
            all_data: !!(fechaInicio || fechaFin || almacen),
            page: 1,
            per_page: 10,
          },
          true
        );

  // 🔹 Hook de almacenes
  const almacenes =
    paraSelectsdestructuringYMap(useAlmacenesSelect, "id", "nombre") || [];

  // 🧾 Normalizar datos para gráfico y tabla
  const items = reporteData?.data?.results || reporteData?.data || [];
  const datosReales = Array.isArray(items)
    ? items.map((v) => ({
        fecha: v.fecha?.slice(0, 10) || "Sin fecha",
        almacen: v.almacen || "Sin dato",
        cantidad: parseFloat(v.cantidad || 0),
      }))
    : [];

  // Filtrado en cliente
  const datosFiltrados = datosReales.filter((v) => {
    const fechaValida =
      (!fechaInicio || v.fecha >= fechaInicio) &&
      (!fechaFin || v.fecha <= fechaFin);
    const almacenValido = !almacen || v.almacen === Number(almacen);
    return fechaValida && almacenValido;
  });

  // Agrupar datos
  const agruparPor = (datos, tipo) => {
    return datos.reduce((acc, v) => {
      let key = "Desconocido";
      if (tipo === "dia") key = v.fecha;
      if (tipo === "semana")
        key = v.fecha
          ? `Semana-${new Date(v.fecha).getWeek()}`
          : "Semana-Desconocida";
      if (tipo === "mes")
        key = v.fecha ? v.fecha.slice(0, 7) : "Mes-Desconocido";
      acc[key] = (acc[key] || 0) + v.cantidad;
      return acc;
    }, {});
  };

  const agrupadas = agruparPor(datosFiltrados, vista);
  const labels = Object.keys(agrupadas).sort();
  const valores = Object.values(agrupadas);

  const chartData = {
    labels,
    datasets: [
      {
        label: tipoReporte === "ventas" ? "Ventas" : "Compras",
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
    <main className="max-w-6xl mx-auto bg-white">
      <Navigation
        title={`Reporte de ${tipoReporte === "ventas" ? "Ventas" : "Compras"}`}
        subTitle={`Visualiza y filtra ${tipoReporte} de tu negocio`}
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

      {/* 🔍 Filtros */}
      <div className="flex flex-wrap gap-4 bg-gray-50 px-2 rounded-md border my-2 py-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Tipo de Reporte
          </label>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={tipoReporte}
            onChange={(e) => setTipoReporte(e.target.value)}
          >
            <option value="ventas">Ventas</option>
            <option value="compras">Compras</option>
          </select>
        </div>
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
          <label className="text-sm font-medium text-gray-700">Almacén</label>
          <select
            className="border rounded px-2 py-1 text-sm bg-white"
            value={almacen}
            onChange={(e) => setAlmacen(e.target.value)}
          >
            <option value="">Todos</option>
            {almacenes?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
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

      {/* 📊 Gráfico + Tabla */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        <div className="border rounded p-2">
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
          {reporteData.isLoading ? (
            <p className="p-4 text-center">Cargando {tipoReporte}...</p>
          ) : datosReales.length === 0 ? (
            <p className="p-4 text-center">No hay {tipoReporte} para mostrar</p>
          ) : (
            <>
              {tipoGrafico === "line" && <Line data={chartData} />}
              {tipoGrafico === "bar" && <Bar data={chartData} />}
              {tipoGrafico === "pie" && <Pie data={chartData} />}
            </>
          )}
        </div>

        <div className="border rounded h-[calc(100vh-250px)] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-2 text-left">Fecha</th>
                <th className="p-2 text-left">
                  {tipoReporte === "ventas" ? "Ventas" : "Compras"}
                </th>
              </tr>
            </thead>
            <tbody>
              {reporteData.isLoading ? (
                <tr>
                  <td colSpan={2} className="p-4 text-center">
                    Cargando...
                  </td>
                </tr>
              ) : datosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-4 text-center">
                    No hay {tipoReporte}
                  </td>
                </tr>
              ) : (
                datosFiltrados.map((v, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <FormattedDate date={v.fecha} showWeekday />
                    </td>
                    <td className="p-2 font-semibold">{v.cantidad}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

// 📅 Función auxiliar para semanas
Date.prototype.getWeek = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

export default Reportes;
