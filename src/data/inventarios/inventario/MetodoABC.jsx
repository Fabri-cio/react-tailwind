import React from "react";
import { useMetodoABC } from "../../../hooks/useEntities";
import { useFormEntity } from "../../../utils/useFormEntity";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Navigation,
  FiltroBusquedaOrden,
  SeleccionarPorPagina,
  Pagination,
} from "../../../components/shared";

export default function MetodoABC() {
  const { todosDatosOpaginacion } = useFormEntity();
  const { items, isLoading, isError } = todosDatosOpaginacion(useMetodoABC, {});

  if (isLoading) return <p className="p-4">Cargando datos...</p>;
  if (isError) return <p className="p-4">Error al cargar los datos.</p>;

  return (
    <div>
      <Navigation
        title="Método ABC"
        subTitle="Reporte"
        actions={[
          {
            to: -1,
            label: "Regresar",
            estilos: "text-white bg-gray-600 rounded-full p-2",
          },
        ]}
      />

      <div className="bg-white flex justify-between px-2">
        <FiltroBusquedaOrden />
        <div className="flex items-center gap-4">
          <SeleccionarPorPagina />
          <Pagination />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="p-4">No hay datos disponibles</p>
      ) : (
        items.map((item) => {
          // Datos transformados para que cada barra tenga su propio color
          const dataProducto = [
            {
              name: item.producto_nombre,
              porcentaje_unidades: parseFloat(item.porcentaje_unidades),
              porcentaje_valor: parseFloat(item.porcentaje_valor),
            },
          ];

          return (
            <div
              key={item.producto_id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center border p-4 rounded-lg shadow bg-white"
            >
              {/* --- Columna izquierda: tabla del producto --- */}
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  {item.producto_nombre}
                </h2>
                <table className="w-full text-sm border border-gray-300">
                  <tbody>
                    {/* Unidades */}
                    <tr>
                      <td className="border p-2 font-medium">
                        Cantidad Total Vendida (unidades)
                      </td>
                      <td className="border p-2">{item.total_unidades}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        Porcentaje del Total de Unidades
                      </td>
                      <td className="border p-2">
                        {item.porcentaje_unidades}%
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        Porcentaje Acumulado de Unidades
                      </td>
                      <td className="border p-2">{item.acumulado_unidades}%</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        Categoría ABC por Unidades
                      </td>
                      <td className="border p-2 font-bold text-blue-600">
                        {item.categoria_unidades}
                      </td>
                    </tr>

                    {/* Valor */}
                    <tr>
                      <td className="border p-2 font-medium">
                        Valor Total de Ventas
                      </td>
                      <td className="border p-2">{item.total_valor}</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        % del Total de Valor
                      </td>
                      <td className="border p-2">{item.porcentaje_valor}%</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        Porcentaje Acumulado de Valor
                      </td>
                      <td className="border p-2">{item.acumulado_valor}%</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">
                        Categoría ABC por Valor
                      </td>
                      <td className="border p-2 font-bold text-red-600">
                        {item.categoria_valor}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* --- Columna derecha: gráfico comparativo con colores distintos --- */}
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataProducto}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="porcentaje_unidades"
                      fill="#36A2EB"
                      name="% Unidades"
                    />
                    <Bar
                      dataKey="porcentaje_valor"
                      fill="#FF6384"
                      name="% Valor"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
