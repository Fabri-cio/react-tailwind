import React from "react";
import { useParams } from "react-router-dom";
import { useDetalleCompraPedido } from "../../../hooks/useEntities";
import Loading from "../../../components/shared/Loading";
import ErrorMessage from "../../../components/shared/Error";
import { Navigation, FormattedDate } from "../../../components/shared";

function DetallesCompra() {
  const { id } = useParams();
  const { data: compra, isLoading, isError } = useDetalleCompraPedido(id);

  if (isLoading) return <Loading message="Cargando detalles de la compra..." />;
  if (isError)
    return <ErrorMessage message="Error al cargar detalles de la compra." />;
  if (!compra)
    return <ErrorMessage message="No se encontraron datos de la compra." />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
      <Navigation
        title={`Detalles de la Compra N° ${compra.id}`}
        subTitle="Información general de la compra"
        actions={[
          {
            label: "Volver",
            to: -1,
            estilos:
              "bg-gray-500 text-white px-4 py-1 rounded-md hover:bg-gray-600",
          },
        ]}
      />

      {/* Información de la compra */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 text-sm">
          <p>
            <span className="font-medium">Proveedor: </span>
            {compra.nombre_proveedor}
          </p>
          <p>
            <span className="font-medium">Razón Social: </span>
            {compra.razon_social}
          </p>
          <p>
            <span className="font-medium">Nro Factura: </span>
            {compra.nro_factura}
          </p>
          <p>
            <span className="font-medium">Observaciones: </span>
            {compra.observaciones || "Sin observaciones"}
          </p>
        </div>
      </div>

      {/* Tabla de detalles de la compra */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Detalles de la Compra
        </h2>
        {compra.detalles?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Producto</th>
                  <th className="py-2 px-3">Cantidad</th>
                  <th className="py-2 px-3">Precio Unit. Bs.</th>
                  <th className="py-2 px-3">Descuento Bs.</th>
                  <th className="py-2 px-3">Subtotal Bs.</th>
                </tr>
              </thead>
              <tbody>
                {compra.detalles.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{item.nombre_producto}</td>
                    <td className="py-2 px-3">{item.cantidad}</td>
                    <td className="py-2 px-3">{item.precio_unitario}</td>
                    <td className="py-2 px-3">{item.descuento_unitario}</td>
                    <td className="py-2 px-3 text-green-600 font-semibold">
                      {item.subtotal}
                    </td>
                  </tr>
                ))}

                {/* Fila totales */}
                <tr className="bg-gray-50 font-semibold border-t">
                  <td colSpan={2} className="py-3 px-4">
                    Totales:
                  </td>
                  <td className="py-3 px-4">{compra.total_cantidad}</td>
                  <td className="py-3 px-4">
                    {Number(compra.total_precio).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {Number(compra.total_descuento).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-green-700">
                    {Number(compra.total_subtotal).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">
            No hay detalles de compra.
          </p>
        )}
      </div>

      {/* Información del pedido original */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Pedido Original
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 text-sm">
          <p>
            <span className="font-medium">Proveedor: </span>
            {compra.detallesPedido?.nombre_proveedor}
          </p>
          <p>
            <span className="font-medium">Almacén: </span>
            {compra.detallesPedido?.nombre_almacen}
          </p>
          <p>
            <span className="font-medium">Estado: </span>
            {compra.detallesPedido?.estado}
          </p>
          <p>
            <span className="font-medium">Fecha Entrega: </span>
            <FormattedDate date={compra.detallesPedido?.fecha_entrega} />
          </p>
          <p>
            <span className="font-medium">Observaciones: </span>
            {compra.detallesPedido?.observaciones}
          </p>
        </div>

        {/* Tabla de productos solicitados en el pedido */}
        <h3 className="text-md font-semibold text-gray-800 mt-4 mb-2">
          Detalles del Pedido
        </h3>
        {compra.detallesPedido?.detalles?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-0 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Producto</th>
                  <th className="py-2 px-3">Cantidad Solicitada</th>
                </tr>
              </thead>
              <tbody>
                {compra.detallesPedido.detalles.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">{item.nombre_producto}</td>
                    <td className="py-2 px-3">{item.cantidad_solicitada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">
            No hay detalles en el pedido.
          </p>
        )}
      </div>
    </div>
  );
}

export default DetallesCompra;
