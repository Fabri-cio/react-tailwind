import { memo } from "react";

const ProductoFila = memo(({ producto, index, onDetallesClick }) => {
  const {
    id_producto,
    estado,
    nombre,
    precio,
    codigo_barras,
    nombre_proveedor,
    nombre_categoria,
  } = producto;

  const estadoClass = estado
    ? "bg-green-200 text-green-700"
    : "bg-red-200 text-red-700";

  return (
    <tr className="hover:bg-gray-100 transition-all">
      <td className="py-2 px-3 text-sm text-gray-700 text-center">{index}</td>
      <td className="py-2 px-3 text-center">
        <span
          className={`inline-block px-2 py-1 rounded-full text-xs ${estadoClass}  border border-${
            estado ? "green" : "red"
          }-500`}
        >
          {estado ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="py-2 px-3 text-sm">{nombre}</td>
      <td className="py-2 px-3 text-sm">{nombre_proveedor}</td>
      <td className="py-2 px-3 text-sm">{nombre_categoria}</td>
      <td className="py-2 px-3 text-sm text-center">{precio.toFixed(2)}</td>
      <td className="py-2 px-3 text-sm">{codigo_barras}</td>
      <td className="py-2 px-3 text-center">
        <button
          onClick={() => onDetallesClick(id_producto, producto)}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          Editar
        </button>
      </td>
    </tr>
  );
});

export default ProductoFila;
