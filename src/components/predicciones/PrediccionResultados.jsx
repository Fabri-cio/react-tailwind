import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import {Navigation} from "../shared";
import { FormattedDate, Table } from "../shared";

function PrediccionResultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const { forecast } = location.state || {};

  if (!forecast) {
    return <p>No hay resultados de predicción disponibles.</p>;
  }

  // Agrupar por día de la semana para el BarChart
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const weeklyData = daysOfWeek.map((day, index) => {
    const dayItems = forecast.filter((f) => new Date(f.ds).getDay() === index);
    const avg = dayItems.length
      ? dayItems.reduce((sum, i) => sum + i.yhat, 0) / dayItems.length
      : 0;
    return { day, avg: parseFloat(avg.toFixed(1)) };
  });

  return (
    <div className="p-2 space-y-6">
      <Navigation
        title="Resultados de la Predicción"
        subTitle="Detalles de la predicción"
        actions={[
          {
            label: "Volver",
            to: -1,
            estilos: "bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600",
          },
        ]}
      />

      {/* Gráfico 1: LineChart con rango de confianza */}
      <div className="bg-white shadow rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Predicción con Rango de Confianza
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={forecast}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="ds" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="yhat_upper"
              stroke="none"
              fill="#E94E77"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="yhat_lower"
              stroke="none"
              fill="#50E3C2"
              fillOpacity={0.2}
            />
            <Line
              type="monotone"
              dataKey="yhat"
              stroke="#4A90E2"
              dot={false}
              name="Predicción"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 2: BarChart semanal */}
      <div className="bg-white shadow rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Promedio por Día de la Semana
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avg" fill="#4A90E2" name="Promedio" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico 3: Área visual */}
      <div className="bg-white shadow rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Área de Predicción
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={forecast}>
            <defs>
              <linearGradient id="colorYhat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4A90E2" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4A90E2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="ds"/>
            <YAxis />
            <CartesianGrid stroke="#ccc" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="yhat"
              stroke="#4A90E2"
              fill="url(#colorYhat)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <Table
        items={forecast}
        fields={[
          {
            label: "Fecha",
            key: "ds",
            render: (item) => (
              <FormattedDate date={item.ds} format="DD/MM/yyyy" showWeekday />
            ),
          },
          {
            label: "Predicción",
            key: "yhat",
            render: (item) => item.yhat.toFixed(1),
          },
          {
            label: "Mínimo",
            key: "yhat_lower",
            render: (item) => item.yhat_lower.toFixed(1),
          },
          {
            label: "Máximo",
            key: "yhat_upper",
            render: (item) => item.yhat_upper.toFixed(1),
          },
        ]}
      />
    </div>
  );
}

export default PrediccionResultados;
