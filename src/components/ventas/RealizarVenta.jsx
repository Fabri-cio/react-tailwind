import { ProductosAPI } from "../../api/producto.api";

const RealizarVenta = () => {
  ProductosAPI.getFiltered({
    codigo_barras: "9898987898765",
  });
  return (
    <div>
      <h1>Realizar Venta</h1>
    </div>
  );
};

export default RealizarVenta;
