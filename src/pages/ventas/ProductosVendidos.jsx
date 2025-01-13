import React from "react";
import { useProductosVendidos } from "../../hooks/useProductosVendidos";

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

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{nombre_producto}</td>
        <td>{fecha_venta}</td>
        <td>{cantidad}</td>
        <td>{precio_unitario}</td>
        <td>{descuento_unitario}</td>
        <td>{subtotal}</td>
      </tr>
    );
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Cantidad</th>
            <th>Precio Bs.</th>
            <th>Descuento Bs.</th>
            <th>Total Bs.</th>
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
