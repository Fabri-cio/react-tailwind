import { useNavigate } from "react-router-dom";
export function ProductoCard({ prod }) {
  //   const navigate = useNavigate();

  return (
    <tr className="bg-gray-100 hover:bg-gray-200">
      <td className="py-2 px-4 border-b border-gray-200">{prod.nombre}</td>
      <td className="py-2 px-4 border-b border-gray-200">{prod.descripcion}</td>
      <td className="py-2 px-4 border-b border-gray-200">${prod.precio}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        {prod.cantidad_stock}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">
        {prod.unidad_medida}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">{prod.categoria}</td>
      <td className="py-2 px-4 border-b border-gray-200">
        {/* { <BotonActualizar productoId={prod.id_producto} /> } */}
      </td>
      <td className="py-2 px-4 border-b border-gray-200">
        {/* <BotonEliminar productoId={prod.id_producto} /> */}
      </td>
    </tr>
  );
}
