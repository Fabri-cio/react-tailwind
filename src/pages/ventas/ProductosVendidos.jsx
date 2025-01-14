import React from "react";
import { useProductosVendidos } from "../../hooks/useProductosVendidos";
import { format } from "date-fns";
import { es } from "date-fns/locale";

function ProductosVendidos() {
  const {
    productosVendidos,
    loading: loadingProductosVendidos,
    error: errorProductosVendidos,
  } = useProductosVendidos();

  console.log("Productos vendidos cargados:", productosVendidos);

  if (loadingProductosVendidos) return <p>Cargando productos vendidos...</p>;
  if (errorProductosVendidos) return <p>Error: {errorProductosVendidos}</p>;

  const ProductosVendidos = ({ productosVendidos, index }) => {
    const {
      id_detalle_venta,
      id_venta,
      fecha_venta,
      id_producto,
      nombre_producto,
      cantidad,
      precio_unitario,
      subtotal,
      descuento_unitario,
    } = productosVendidos;

    const formatDate = fecha_venta
      ? format(new Date(fecha_venta), "dd'/'MMMMMMMMMMM'/'yyyy", { locale: es })
      : "Fecha inválida";

    return (
      <tr>
        <td  className="text-center">{index + 1}</td>
        <td>{nombre_producto}</td>
        <td className="text-center">{formatDate}</td>
        <td className="text-center">{cantidad}</td>
        <td className="text-center">{precio_unitario}</td>
        <td className="text-center">{descuento_unitario}</td>
        <td className="text-center">{subtotal}</td>
      </tr>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-200 text-gray-700">
          <tr className="text-center">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Fecha</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Precio Bs.</th>
            <th className="border border-gray-300 px-4 py-2">Descuento Bs.</th>
            <th className="border border-gray-300 px-4 py-2">Total Bs.</th>
          </tr>
        </thead>
        <tbody>
          {productosVendidos.map((producto, index) => (
            <ProductosVendidos
              key={producto.id_detalle_venta || index}
              productosVendidos={producto}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosVendidos;
