import React from "react";
import { useParams } from "react-router-dom";
import { useVenta } from "../../../hooks/useEntities";
import Loading from "../../../components/shared/Loading";
import ErrorMessage from "../../../components/shared/ErrorMessaje";
import { FormattedDate, Navigation } from "../../../components/shared";

function DetallesVenta() {
  const { id } = useParams();
  const { data: venta, isLoading, isError } = useVenta(id);

  if (isLoading) return <Loading message="Cargando detalles de la venta..." />;
  if (isError)
    return <ErrorMessage message="Error al cargar detalles de la venta." />;
  if (!venta)
    return <ErrorMessage message="No se encontraron datos de la venta." />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <Navigation
        title={`Detalles de la Venta N° ${venta.id}`}
        subTitle="Información de la venta"
        actions={[
          {
            label: "Volver",
            to: -1,
            estilos:
              "bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600",
          },
        ]}
      />
      {/* Información de la venta */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 text-sm">
          <p>
            <span className="font-medium">Fecha: </span>
            <FormattedDate date={venta.fecha_creacion} showWeekday />
          </p>
          <p>
            <span className="font-medium">Usuario: </span>
            {venta.usuario_creacion}
          </p>
          <p>
            <span className="font-medium">Tienda: </span> {venta.nombre_tienda}
          </p>
          <p>
            <span className="font-medium">Método de pago: </span>{" "}
            {venta.metodo_pago}
          </p>
          <p>
            <span className="font-medium">Descuento: </span> Bs.{" "}
            {venta.descuento}
          </p>
          <p>
            <span className="font-medium">Total: </span> Bs. {venta.total_venta}
          </p>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Productos</h2>
        {venta.detalles && venta.detalles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 font-medium text-gray-700">#</th>
                  <th className="py-2 px-3 font-medium text-gray-700">
                    Producto
                  </th>
                  <th className="py-2 px-3 font-medium text-gray-700">
                    Cantidad
                  </th>
                  <th className="py-2 px-3 font-medium text-gray-700">
                    Precio Unit. Bs.
                  </th>
                  <th className="py-2 px-3 font-medium text-gray-700">
                    Descuento Bs.
                  </th>
                  <th className="py-2 px-3 font-medium text-gray-700">
                    Subtotal Bs.
                  </th>
                </tr>
              </thead>
              <tbody>
                {venta.detalles.map((detalle, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{detalle.nombre_producto}</td>
                    <td className="py-2 px-3">{detalle.cantidad}</td>
                    <td className="py-2 px-3">{detalle.precio_unitario}</td>
                    <td className="py-2 px-3">{detalle.descuento_unitario}</td>
                    <td className="py-2 px-3 text-green-600 font-semibold">
                      {detalle.sub_total}
                    </td>
                  </tr>
                ))}

                {/* Fila de totales usando datos del backend */}
                <tr className="bg-gray-50 font-semibold border-t">
                  <td className="py-3 px-4" colSpan={2}>
                    Totales:
                  </td>
                  <td className="py-3 px-4">{venta.total_cantidad}</td>
                  <td className="py-3 px-4">
                    {Number(venta.total_precio).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {Number(venta.total_descuento).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-green-700">
                    {Number(venta.total_subtotal).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">
            No hay detalles para esta venta.
          </p>
        )}
      </div>
    </div>
  );
}

export default DetallesVenta;
