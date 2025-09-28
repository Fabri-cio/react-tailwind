import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  useInventarioVenta,
  useConfiguracionesModelos,
} from "../../hooks/useEntities";
import {
  ActionButton,
  InputField,
  Navigation,
  SelectField,
  Table,
} from "../shared";
import ventasEjemplo from "./ventasEjemplo.json";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/ErrorMessaje";
import { useFormEntity } from "../../utils/useFormEntity";

ChartJS.register(...registerables);

function DetallesProducto() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horizon, setHorizon] = useState(7); // Predicción por defecto 7 días

  const { id } = useParams();
  const { data: inventario = {}, isLoading, isError } = useInventarioVenta(id);

  const navigate = useNavigate();

  // Datos de prueba
  const producto = "Producto de Ejemplo";
  const ventas = ventasEjemplo;

  // Transformación de los datos (seguro, no es hook)
  const modelosOptions = paraSelectsdestructuringYMap(
    useConfiguracionesModelos,
    "id",
    "nombre"
  );

  // Agrupar ventas por fecha
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

  // Filtrar ventas según fechas seleccionadas
  const ventasFiltradas = ventasParaTabla.filter((v) => {
    const fecha = new Date(v.fecha);
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;
    return (!inicio || fecha >= inicio) && (!fin || fecha <= fin);
  });

  // Configuración del gráfico
  const dataLine = {
    labels: ventasFiltradas.map((v) => v.fecha),
    datasets: [
      {
        label: "Ventas por Día",
        data: ventasFiltradas.map((v) => v.cantidad),
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
      legend: { display: true, position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", axis: "x", intersect: false },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 20,
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

    // Filtrar ventas según fechas seleccionadas
    const ventasFiltradas = ventasParaTabla.filter((v) => {
      const fecha = new Date(v.fecha);
      const inicio = fechaInicio ? new Date(fechaInicio) : null;
      const fin = fechaFin ? new Date(fechaFin) : null;
      return (!inicio || fecha >= inicio) && (!fin || fecha <= fin);
    });

    const formData = new FormData();
    const csvRows = ['"ds","y"'];
    ventasFiltradas.forEach((venta) => {
      csvRows.push(`"${venta.fecha}",${venta.cantidad}`);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    formData.append("file", blob, `${producto}_ventas_diarias.csv`);

    // Incluir la configuración del modelo con horizon y toggles
    formData.append(
      "config",
      JSON.stringify({
        modelo_id: modeloSeleccionado.id,
        periodos_prediccion: horizon,
      })
    );

    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/predicciones/prediccion/csv/",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      if (response.ok) {
        navigate("/prediccion-resultados", {
          state: {
            forecast: data.forecast,
            inventario: inventario.id,
            configuracion: modeloSeleccionado.id,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            horizon: horizon,
          },
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
    <div className="space-y-1">
      <Navigation
        title={`Gráficos de Ventas - ${inventario.producto_nombre}`}
        subTitle="Detalles de las ventas"
        actions={[]}
      />

      {/* Rango de fechas + Modelo + Horizon + Toggles + Botón */}
      <div className="flex flex-wrap items-end gap-4 w-full md:w-full">
        <div className="flex items-center gap-2">
          <InputField
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            label="Inicio"
            labelPosition="left"
          />
        </div>
        <div className="flex items-center gap-2">
          <InputField
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            label="Fin"
            labelPosition="left"
          />
        </div>
        <div className="flex items-center gap-2">
          <InputField
            type="number"
            min={1}
            value={horizon}
            onChange={(e) => setHorizon(Number(e.target.value))}
            label="Horizonte"
            labelPosition="left"
          />
        </div>
        <div className="flex items-center gap-2 flex-1">
          <SelectField
            label="Modelo"
            name="modelo"
            value={modeloSeleccionado?.id || ""}
            onChange={(e) => {
              const modelo = modelosOptions.find(
                (m) => m.id === Number(e.target.value)
              );
              setModeloSeleccionado(modelo);
            }}
            options={modelosOptions}
          />
        </div>
        <ActionButton
          onClick={enviarCSVyObtenerPrediccion}
          label="Predecir"
          estilos="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
        />
      </div>

      {/* Gráfico y Tabla */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Line data={dataLine} options={optionsLine} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="max-h-72 overflow-y-auto">
            <Table
              items={ventasFiltradas}
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
