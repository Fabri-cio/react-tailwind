import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

function PrediccionResultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const { forecast } = location.state || {};

  if (!forecast) {
    return <p>No hay resultados de predicción disponibles.</p>;
  }

  return (
    <div className="p-8 space-y-6">
      <button
        className="text-blue-500 underline mb-4"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Resultados de la Predicción
      </h3>

      {/* Gráfico */}
      <div className="bg-white shadow rounded-lg p-4">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Gráfico de Predicciones
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="ds" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="yhat"
              stroke="#4A90E2"
              dot={false}
              name="Predicción"
            />
            <Line
              type="monotone"
              dataKey="yhat_lower"
              stroke="#50E3C2"
              dot={false}
              name="Límite Inferior"
            />
            <Line
              type="monotone"
              dataKey="yhat_upper"
              stroke="#E94E77"
              dot={false}
              name="Límite Superior"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <table className="min-w-full table-auto mt-6 border-collapse border border-gray-200">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-4 py-2 text-left text-gray-600">Fecha</th>
            <th className="px-4 py-2 text-left text-gray-600">Predicción</th>
            <th className="px-4 py-2 text-left text-gray-600">Mínimo</th>
            <th className="px-4 py-2 text-left text-gray-600">Máximo</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((pred, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-700">{pred.ds}</td>
              <td className="px-4 py-2 text-gray-700">{pred.yhat.toFixed(2)}</td>
              <td className="px-4 py-2 text-gray-700">
                {pred.yhat_lower.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-gray-700">
                {pred.yhat_upper.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrediccionResultados;
