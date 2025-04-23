import { useParams } from "react-router-dom";
import { useVenta } from "../../hooks/useEntities";
import Table from "../../components/shared/Table";
import FormattedDate from "../../components/shared/FormattedDate";

function DetallesVenta() {
  const { id } = useParams();

  const { data: response } = useVenta(id);

  if (response) {
    const {
      data: { detalles },
    } = response;
  }
  const detalles = response?.data?.detalles || [];
  const data = response?.data || {};

  const fields = () => [
    { key: "index", label: "N°" },
    { key: "nombre_producto", label: "Producto" },
    { key: "cantidad", label: "Cantidad" },
    { key: "precio_unitario", label: "Precio Bs." },
    { key: "descuento_unitario", label: "Descuento Bs." },
    { key: "subtotal", label: "Subtotal Bs." },
  ];

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Detalles de Venta
        </h1>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">
              Fecha: <FormattedDate date={data.fecha_venta} format="DD/MMM/YYYY" />
            </p>
            <p className="text-gray-600">Cajero: {data.nom_user}</p>
            <p className="text-gray-600">Tienda: {data.nombre_tienda}</p>
            <p className="text-gray-600">Pago: {data.metodo_pago}</p>
            <p className="text-gray-600">Total: {data.total_venta} Bs.</p>
          </div>
        </div>
      </div>
      <Table
        items={detalles}
        fields={fields()}
        currentPage={1}
        itemsPerPage={detalles.length}
      />
    </div>
  );
}

export default DetallesVenta;
