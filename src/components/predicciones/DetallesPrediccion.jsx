import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import {
  useInventarioVenta,
  useConfiguracionesModelos,
} from "../../hooks/useEntities";
import { SelectField } from "../shared";

ChartJS.register(...registerables);

function DetallesProducto() {
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: inventarioVenta, isLoading } = useInventarioVenta(id);
  const { data: modelosData } =
    useConfiguracionesModelos({ all_data: true }) || [];

  // Guardamos los modelos tal cual vienen del backend para tener todos los campos
  const modelosOptions = Array.isArray(modelosData) ? modelosData : [];

  const producto = inventarioVenta?.producto_nombre;
  const ventas = inventarioVenta?.ventas || [];

  if (isLoading) return <p>Cargando datos...</p>;
  if (!producto || ventas.length === 0) return <p>No hay datos disponibles.</p>;

  // Preparar datos para gráficos
  const fechas = ventas.map((venta) =>
    new Date(venta.fecha_creacion).toLocaleDateString("es-ES")
  );

  const cantidades = ventas.map((venta) =>
    venta.detalles.reduce((sum, det) => sum + det.cantidad, 0)
  );

  const dataLine = {
    labels: fechas,
    datasets: [
      {
        label: "Ventas por Fecha",
        data: cantidades,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const dataBar = {
    labels: fechas,
    datasets: [
      {
        label: "Ventas por Fecha",
        data: cantidades,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const dataPie = {
    labels: fechas,
    datasets: [
      {
        data: cantidades,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const dataScatter = {
    datasets: [
      {
        label: "Cantidad vs. Hora",
        data: ventas.flatMap((venta) =>
          venta.detalles.map((detalle) => ({
            x: new Date(venta.fecha_creacion).getHours(),
            y: detalle.cantidad,
          }))
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Estadísticas
  const totalCantidad = ventas.reduce(
    (sumVentas, venta) =>
      sumVentas +
      venta.detalles.reduce((sumDet, det) => sumDet + det.cantidad, 0),
    0
  );

  const fechaMayorVenta = ventas.reduce((maxVenta, venta) => {
    const totalVenta = venta.detalles.reduce(
      (sum, det) => sum + det.cantidad,
      0
    );
    const maxTotal = maxVenta.detalles.reduce(
      (sum, det) => sum + det.cantidad,
      0
    );
    return totalVenta > maxTotal ? venta : maxVenta;
  }, ventas[0]);

  const cantidadPorDia = ventas.reduce((acc, venta) => {
    const fecha = format(new Date(venta.fecha_creacion), "dd/MM/yyyy");
    if (!acc[fecha]) acc[fecha] = [];
    acc[fecha].push(venta);
    return acc;
  }, {});

  // Exportar CSV y predicción
  const enviarCSVyObtenerPrediccion = async () => {
    if (!modeloSeleccionado) {
      alert("Selecciona un modelo antes de predecir");
      return;
    }

    const formData = new FormData();
    const csvRows = ['"ds","y"'];

    ventas.forEach((venta) => {
      venta.detalles.forEach((detalle) => {
        const fecha = format(new Date(venta.fecha_creacion), "yyyy-MM-dd");
        csvRows.push(`"${fecha}",${detalle.cantidad}`);
      });
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    formData.append("file", blob, `${producto}_detalles.csv`);

    // Se envía todo el objeto seleccionado
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

  return (
    <div className="p-8 space-y-6">
      <button
        className="text-blue-500 underline mb-4"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Gráficos para: {producto}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Líneas</h4>
          <Line data={dataLine} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Columnas</h4>
          <Bar data={dataBar} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico Circular</h4>
          <Pie data={dataPie} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Dispersión</h4>
          <Scatter data={dataScatter} />
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Estadísticas</h4>
        <p>
          <strong>Total Vendido:</strong> {totalCantidad} unidades
        </p>
        <p>
          <strong>Mayor Venta:</strong>{" "}
          {fechaMayorVenta.detalles.reduce((sum, det) => sum + det.cantidad, 0)}{" "}
          unidades el{" "}
          {format(
            new Date(fechaMayorVenta.fecha_creacion),
            "dd/MM/yyyy HH:mm",
            { locale: es }
          )}
        </p>
        <h5 className="font-semibold mt-4">Cantidad por Día:</h5>
        <ul className="list-disc ml-5">
          {Object.entries(cantidadPorDia).map(([fecha, ventasDia], idx) => (
            <li key={idx}>
              <strong>{fecha}:</strong>
              <ul className="ml-5 list-square">
                {ventasDia.map((venta, jdx) =>
                  venta.detalles.map((detalle, kdx) => (
                    <li key={`${jdx}-${kdx}`}>
                      {detalle.cantidad} unidades a las{" "}
                      {format(new Date(venta.fecha_creacion), "HH:mm", {
                        locale: es,
                      })}
                    </li>
                  ))
                )}
              </ul>
            </li>
          ))}
        </ul>

        <SelectField
          label="Modelo"
          name="modelo"
          value={modeloSeleccionado?.id || ""}
          onChange={(e) => {
            const modelo = modelosOptions.find(
              (m) => m.id === Number(e.target.value)
            );
            setModeloSeleccionado(modelo);
            console.log("===== CONFIG SELECCIONADA =====");
            console.log(modelo);
            console.log("============================");
          }}
          options={modelosOptions.map((m) => ({
            id: m.id,
            nombre: m.nombre_config,
          }))}
        />
      </div>

      <button
        onClick={enviarCSVyObtenerPrediccion}
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
      >
        Exportar a CSV y Predecir
      </button>
    </div>
  );
}

export default DetallesProducto;
