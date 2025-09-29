import { Navigation, Table } from "../../../components/shared";
import { useParams } from "react-router-dom";
import { usePrediccion } from "../../../hooks/useEntities";
import { Loading, Error } from "../../../components/shared";
import { useState, useRef, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const DetallesPrediccion = () => {
  const { id } = useParams();
  const { data: predicciones = {}, isLoading, error } = usePrediccion(id);

  const resultado = predicciones?.resultado
    ? parseFloat(predicciones.resultado.replace(",", ".")).toFixed(2)
    : "0.00";

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  const GraficaPrediccion = ({ detalles }) => {
    const data =
      detalles?.map((detalle) => ({
        fecha: detalle.fecha,
        cantidad: detalle.cantidad,
      })) ?? [];

    const [zoom, setZoom] = useState({
      startIndex: 0,
      endIndex: data.length - 1,
    });
    const chartRef = useRef(null);

    useEffect(() => {
      const div = chartRef.current;

      const handleWheel = (e) => {
        e.preventDefault(); // ahora funciona correctamente
        const zoomFactor = 0.25; // zoom más fuerte
        const minVisible = 2;
        const maxVisible = data.length;

        const { startIndex, endIndex } = zoom;
        const visibleCount = endIndex - startIndex + 1;
        const delta = e.deltaY > 0 ? 1 : -1;

        let newVisibleCount = visibleCount * (1 + delta * zoomFactor);
        newVisibleCount = Math.max(
          minVisible,
          Math.min(maxVisible, newVisibleCount)
        );

        const centerIndex = Math.floor((startIndex + endIndex) / 2);
        let newStart = Math.floor(centerIndex - newVisibleCount / 2);
        let newEnd = Math.floor(centerIndex + newVisibleCount / 2);

        if (newStart < 0) {
          newEnd = Math.min(newEnd - newStart, data.length - 1);
          newStart = 0;
        }
        if (newEnd > data.length - 1) {
          newStart = Math.max(0, newStart - (newEnd - (data.length - 1)));
          newEnd = data.length - 1;
        }

        setZoom({ startIndex: newStart, endIndex: newEnd });
      };

      div.addEventListener("wheel", handleWheel, { passive: false });

      return () => div.removeEventListener("wheel", handleWheel);
    }, [zoom, data.length]);

    return (
      <div ref={chartRef} style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.slice(zoom.startIndex, zoom.endIndex + 1)}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
            <XAxis
              dataKey="fecha"
              angle={-45}
              textAnchor="end"
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cantidad"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <Navigation
        title={`Predicción ${predicciones?.nombre_producto}`}
        subTitle={`${resultado} unidades del ${predicciones?.fecha_inicio} al ${predicciones?.fecha_fin}`}
        actions={[
          {
            label: "Regresar",
            to: "/predicciones",
            estilos: "bg-red-400 text-white rounded px-4 py-2",
          },
        ]}
      />

      <GraficaPrediccion detalles={predicciones?.detalles} />
      <Table
        items={predicciones?.detalles}
        fields={[
          { key: "index", label: "N°" },
          { key: "fecha", label: "Fecha" },
          { key: "cantidad", label: "Cantidad" },
        ]}
      />
    </div>
  );
};

export default DetallesPrediccion;
