import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Line, Bar, Pie, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

function DetallesProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const { producto, detalles } = location.state || {};
  console.log(producto, detalles);

  if (!producto || !detalles) {
    return <p>No hay datos disponibles.</p>;
  }

  // Preparar datos para los gráficos
  const fechas = detalles.map((detalle) =>
    new Date(detalle.fecha_venta).toLocaleDateString("es-ES")
  );
  const cantidades = detalles.map((detalle) => detalle.cantidad);

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
        data: detalles.map((detalle) => ({
          x: new Date(detalle.fecha_venta).getHours(),
          y: detalle.cantidad,
        })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Calcular estadísticas
  const totalCantidad = detalles.reduce(
    (sum, detalle) => sum + detalle.cantidad,
    0
  );

  const fechaMayorVenta = detalles.reduce((max, detalle) => {
    return detalle.cantidad > max.cantidad ? detalle : max;
  }, detalles[0]);

  const cantidadPorDia = detalles.reduce((acc, detalle) => {
    const fecha = format(new Date(detalle.fecha_venta), "dd/MM/yyyy");
    if (!acc[fecha]) {
      acc[fecha] = [];
    }
    acc[fecha].push(detalle);
    return acc;
  }, {});

  // Función para exportar CSV
  // Función para enviar el CSV y obtener la predicción
  const enviarCSVyObtenerPrediccion = async () => {
    const formData = new FormData();
    const csvRows = [];
    csvRows.push('"ds","y"');
    detalles.forEach((detalle) => {
      const fecha = format(new Date(detalle.fecha_venta), "yyyy-MM-dd");
      csvRows.push(`"${fecha}",${detalle.cantidad}`);
    });
    const csvString = csvRows.join("\n");

    // Agrega el log para verificar el contenido del CSV
    console.log(csvString);

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    formData.append("file", blob, `${producto}_detalles.csv`);

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

      {/* Contenedor de los gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Líneas */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Líneas</h4>
          <Line data={dataLine} />
        </div>

        {/* Gráfico de Columnas */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Columnas</h4>
          <Bar data={dataBar} />
        </div>

        {/* Gráfico Circular */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico Circular</h4>
          <Pie data={dataPie} />
        </div>

        {/* Gráfico de Dispersión */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h4 className="text-lg font-semibold mb-4">Gráfico de Dispersión</h4>
          <Scatter data={dataScatter} />
        </div>
      </div>

      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Detalles del Producto: {producto}
      </h3>

      {/* Estadísticas */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Estadísticas</h4>
        <p className="mb-2">
          <strong>Total Vendido:</strong> {totalCantidad} unidades
        </p>
        <p className="mb-2">
          <strong>Mayor Venta:</strong> {fechaMayorVenta.cantidad} unidades el{" "}
          {format(new Date(fechaMayorVenta.fecha_venta), "dd/MM/yyyy HH:mm", {
            locale: es,
          })}
        </p>
        <h5 className="font-semibold mt-4">Cantidad por Día:</h5>
        <ul className="list-disc ml-5">
          {Object.entries(cantidadPorDia).map(([fecha, ventas], idx) => (
            <li key={idx}>
              <strong>{fecha}:</strong>
              <ul className="ml-5 list-square">
                {ventas.map((venta, idx) => (
                  <li key={idx}>
                    {venta.cantidad} unidades a las{" "}
                    {format(new Date(venta.fecha_venta), "HH:mm", {
                      locale: es,
                    })}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para exportar a CSV y predecir */}
      <button
        onClick={enviarCSVyObtenerPrediccion}
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mb-4"
      >
        Exportar a CSV y Predecir
      </button>

      {/* Tabla de Detalles */}
      <table className="min-w-full table-auto mt-6">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Cantidad Vendida</th>
            <th className="px-4 py-2 text-left">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((detalle, idx) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{detalle.cantidad}</td>
              <td className="px-4 py-2">
                {format(new Date(detalle.fecha_venta), "dd/MM/yyyy HH:mm", {
                  locale: es,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetallesProducto;
