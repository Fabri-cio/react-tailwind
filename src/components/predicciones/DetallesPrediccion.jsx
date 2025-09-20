import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  useInventarioVenta, // 🔹 Descomentar cuando uses datos reales
  useConfiguracionesModelos,
} from "../../hooks/useEntities";
import { Navigation, SelectField, Table } from "../shared";
import ventasEjemplo from "./ventasEjemplo.json";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/ErrorMessaje";

ChartJS.register(...registerables);

function DetallesProducto() {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  const { id } = useParams();
  console.log(id);
  const { data: inventario = {}, isLoading, isError } = useInventarioVenta(id);
  const navigate = useNavigate();

  // 🔹 Datos de prueba
  const producto = "Producto de Ejemplo";
  const ventas = ventasEjemplo;

  const { data: modelosData = {} } = useConfiguracionesModelos({
    all_data: true,
  });

  const modelosOptions = Array.isArray(modelosData)
    ? modelosData
    : modelosData.results || [];

  // 🔹 Agrupar ventas por fecha
  const ventasAgrupadas = ventas.reduce((acc, venta) => {
    const fecha = format(new Date(venta.fecha), "yyyy-MM-dd");
    const cantidad = venta.cantidad;
    acc[fecha] = (acc[fecha] || 0) + cantidad;
    return acc;
  }, {});

  const ventasParaTabla = Object.entries(ventasAgrupadas).map(
    ([fecha, cantidad], index) => ({
      index: index + 1,
      fecha,
      cantidad,
    })
  );

  // 🔹 Configuración del gráfico mejorada
  const dataLine = {
    labels: ventasParaTabla.map((v) => v.fecha),
    datasets: [
      {
        label: "Ventas por Día",
        data: ventasParaTabla.map((v) => v.cantidad),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // o 60 grados
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20, // limita la cantidad de etiquetas mostradas
        },
      },
      y: { beginAtZero: true },
    },
  };

  const enviarCSVyObtenerPrediccion = async () => {
    if (!modeloSeleccionado) {
      alert("Selecciona un modelo antes de predecir");
      return;
    }

    const formData = new FormData();
    const csvRows = ['"ds","y"'];
    ventasParaTabla.forEach((venta) => {
      csvRows.push(`"${venta.fecha}",${venta.cantidad}`);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    formData.append("file", blob, `${producto}_ventas_diarias.csv`);
    formData.append("config", JSON.stringify(modeloSeleccionado));

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/predicciones/prediccion/csv/",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/prediccion-resultados", {
          state: { forecast: data.forecast },
        });
      } else {
        alert("Error al realizar la predicción: " + data.error);
      }
    } catch (error) {
      alert("Error en la conexión con el servidor: " + error.message);
    }
  };

  if (isLoading)
    return <Loading message="Cargando detalles del inventario..." />;
  if (isError)
    return <ErrorMessage message="Error al cargar detalles del inventario." />;
  if (!inventario)
    return <ErrorMessage message="No se encontraron datos del inventario." />;

  return (
    <div className="space-y-4">
      <Navigation
        title={`Gráficos de Ventas - ${inventario.producto_nombre}`}
        subTitle="Detalles de las ventas"
        actions={[]}
      />

      {/* Rango de fechas + Modelo + Botón en una sola línea */}
      <div className="flex flex-wrap items-end gap-4 w-full md:w-full">
        {/* Fecha inicio */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-16 text-right">
            Inicio:
          </label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 w-36"
          />
        </div>

        {/* Fecha fin */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 w-16 text-right">Fin:</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-2 py-1 w-36"
          />
        </div>

        {/* Selector modelo */}
        <div className="flex items-center gap-2 flex-1">
          <label className="text-sm text-gray-600 w-16 text-right">
            Modelo:
          </label>
          <SelectField
            name="modelo"
            value={modeloSeleccionado?.id || ""}
            onChange={(e) => {
              const modelo = modelosOptions.find(
                (m) => m.id === Number(e.target.value)
              );
              setModeloSeleccionado(modelo);
            }}
            options={modelosOptions.map((m) => ({
              id: m.id,
              nombre: m.nombre,
            }))}
            className="w-full"
          />
        </div>

        {/* Botón Predecir */}
        <button
          onClick={enviarCSVyObtenerPrediccion}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Predecir
        </button>
      </div>

      {/* Gráfico y Tabla */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Line data={dataLine} options={optionsLine} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="max-h-72 overflow-y-auto">
            <Table
              items={ventasParaTabla}
              fields={[
                { label: "N°", key: "index" },
                { label: "Fecha", key: "fecha" },
                { label: "Cantidad", key: "cantidad" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesProducto;
