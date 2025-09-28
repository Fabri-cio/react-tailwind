import { LineChart, Line, ResponsiveContainer } from "recharts";

function calcularPendiente(detalles) {
  if (!detalles || detalles.length < 2) return 0;
  const n = detalles.length;
  const xs = detalles.map((_, i) => i);
  const ys = detalles.map((d) => d.cantidad);

  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = xs.reduce((acc, x, i) => acc + x * ys[i], 0);
  const sumX2 = xs.reduce((acc, x) => acc + x * x, 0);

  return (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
}

export default function MiniGraficaPrediccion({ detalles }) {
  if (!detalles || detalles.length === 0) return <span>–</span>;

  const pendiente = calcularPendiente(detalles);

  let color = "#3b82f6"; // azul estable
  if (pendiente > 0.1) color = "#22c55e"; // verde crecimiento
  else if (pendiente < -0.1) color = "#ef4444"; // rojo decreciente

  return (
    <div style={{ width: 120, height: 40 }}>
      {/* Ancho fijo mini */}
      <ResponsiveContainer>
        <LineChart data={detalles}>
          <Line
            type="monotone"
            dataKey="cantidad"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
