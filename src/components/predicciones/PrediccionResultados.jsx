import React, { useState } from "react";
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
import { Navigation } from "../shared";
import { FormattedDate, Table, Modal, ActionButton } from "../shared";
import { FaTimes, FaCheck } from "react-icons/fa";
import { usePrediccionesMutations } from "../../hooks/useEntities";
import { toast } from "react-hot-toast";
import { useFormEntity } from "../../utils/useFormEntity";

function PrediccionResultados() {
  const location = useLocation();
  const navigate = useNavigate();

  const { forecast, inventario, configuracion, fecha_inicio, fecha_fin } =
    location.state || {};

  const { manejarEnvio } = useFormEntity();
  const { crear: createMutation } = usePrediccionesMutations();

  const [showModalPrediccion, setShowModalPrediccion] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Guardar predicción
  const guardarPrediccion = (event) => {
    setLoading(true);

    manejarEnvio(
      event,
      null,
      {
        inventario,
        configuracion,
        fecha_inicio,
        fecha_fin,
        detalles: forecast.map((f) => ({
          fecha: f.ds.split("T")[0],
          cantidad: Math.round(f.yhat),
        })),
      },
      createMutation,
      null,
      null,
      {
        onSuccess: () => {
          toast.success("Predicción guardada correctamente");
          setLoading(false);
          setShowModalPrediccion(false); // ✅ fix aquí
          navigate(-1);
        },
        onError: () => {
          toast.error("Error al guardar la predicción");
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="p-2 space-y-6">
      <Navigation
        title="Resultados de la Predicción"
        subTitle="Detalles de la predicción"
        actions={[
          {
            label: "Volver",
            to: -1,
            estilos:
              "bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600",
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
            <XAxis dataKey="ds" />
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

      <button
        onClick={() => setShowModalPrediccion(true)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Guardar Predicción
      </button>

      {/* Modal de confirmación */}
      {showModalPrediccion && (
        <Modal onClose={() => setShowModalPrediccion(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              Confirmar guardado de predicción
            </h2>
            <p>¿Deseas guardar esta predicción?</p>

            <div className="flex justify-end mt-4 space-x-2">
              <ActionButton
                icon={FaTimes}
                onClick={() => setShowModalPrediccion(false)}
                estilos="px-4 py-2 bg-red-500 text-white rounded"
              />
              <ActionButton
                icon={FaCheck}
                onClick={guardarPrediccion}
                estilos="px-4 py-2 bg-green-500 text-white rounded"
                disabled={loading}
              />
              {loading && <span className="ml-2">Guardando...</span>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PrediccionResultados;
