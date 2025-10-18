import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  useInventarioVenta,
  useConfigModelSelectID,
  useVentasPorInventario,
} from "../../hooks/useEntities";
import {
  ActionButton,
  FormattedDate,
  InputField,
  Navigation,
  SelectField,
  Table,
} from "../shared";
import Loading from "../shared/Loading";
import ErrorMessage from "../shared/Error";
import { useFormEntity } from "../../utils/useFormEntity";
import { FaSearch } from "react-icons/fa";

ChartJS.register(...registerables);

function DetallesProducto() {
  const { paraSelectsdestructuringYMap } = useFormEntity();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horizon, setHorizon] = useState(7); // Horizonte predicción
  const [paramsVentas, setParamsVentas] = useState({
    all_data: false,
    page: 1,
    filters: { inventario_id: id },
  });

  // Datos del inventario
  const { data: inventario = {}, isLoading, isError } = useInventarioVenta(id);

  // Consumir API de ventas por inventario
  const {
    data: ventasData = { results: [] },
    isLoading: loadingVentas,
    refetch: refetchVentas,
  } = useVentasPorInventario(paramsVentas);

  const { data: configModelosData = [], isLoading: loadingModelos } =
    useConfigModelSelectID();
  const modelosOptions = paraSelectsdestructuringYMap(
    configModelosData,
    "id",
    "nombre"
  );

  // Normalizar ventasData para que siempre sea un array
  const ventasArray = Array.isArray(ventasData)
    ? ventasData // all_data=true ya es array
    : ventasData.results || []; // paginado

  // Preparar ventas para tabla y gráfico
  const ventasFiltradas = ventasArray.map((v, index) => ({
    index: index + 1,
    fecha: v.fecha,
    cantidad: v.cantidad,
  }));

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

  // Función de filtrado por fechas
  const aplicarFiltroFechas = () => {
    if (!fechaInicio || !fechaFin) return;

    setParamsVentas({
      all_data: true,
      page: 1,
      filters: {
        inventario_id: id,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
    });
  };

  const enviarCSVyObtenerPrediccion = async () => {
    if (!modeloSeleccionado) {
      alert("Selecciona un modelo antes de predecir");
      return;
    }

    const csvRows = ['"ds","y"'];
    ventasFiltradas.forEach((venta) => {
      csvRows.push(`"${venta.fecha}",${venta.cantidad}`);
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const formData = new FormData();
    formData.append(
      "file",
      blob,
      `${inventario.producto_nombre}_ventas_diarias.csv`
    );

    formData.append(
      "config",
      JSON.stringify({
        modelo_id: modeloSeleccionado.id,
        periodos_prediccion: horizon,
      })
    );

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/predicciones/prediccion/csv/`,
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

  if (isLoading || loadingVentas)
    return <Loading message="Cargando detalles del inventario..." />;
  if (isError)
    return <ErrorMessage message="Error al cargar datos del inventario." />;
  if (!inventario)
    return <ErrorMessage message="No se encontraron datos del inventario." />;

  return (
    <div className="space-y-1">
      <Navigation
        title={`Gráficos de Ventas - ${inventario.producto_nombre}`}
        subTitle="Detalles de las ventas"
        actions={[]}
      />

      {/* Rango de fechas + Modelo + Horizon + Botón Filtrar + Predecir */}
      <div className="flex flex-wrap items-end gap-4 w-full md:w-full">
        <InputField
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          label="Inicio"
          labelPosition="left"
        />
        <InputField
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          label="Fin"
          labelPosition="left"
        />
        <ActionButton
          onClick={aplicarFiltroFechas}
          icon={FaSearch}
          estilos="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
        />
        <InputField
          type="number"
          min={1}
          value={horizon}
          onChange={(e) => setHorizon(Number(e.target.value))}
          label="Horizonte"
          labelPosition="left"
        />
        <SelectField
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
                {
                  label: "Fecha",
                  key: "fecha",
                  render: (item) => <FormattedDate date={item.fecha} />,
                },
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
