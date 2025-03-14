import ProductoFila from "./ProductoFila";

const Table = ({ productos, onDetallesClick }) => {
  // Verificamos que productos sea un arreglo y si está vacío
  const productosValidos = Array.isArray(productos) ? productos : [];

  return (
    <table className="min-w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          {[
            "#",
            "Estado",
            "Nombre",
            "Proveedor",
            "Categoría",
            "Precio Bs.",
            "Código",
            "Acciones",
          ].map((header) => (
            <th
              key={header}
              className="py-3 px-4 text-sm text-left font-semibold text-gray-700 border-b"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {productosValidos.length === 0 ? (
          <tr>
            <td colSpan={8} className="py-3 px-4 text-center text-sm text-gray-500">
              No hay productos disponibles.
            </td>
          </tr>
        ) : (
          productosValidos.map((producto, index) => (
            <ProductoFila
              key={producto.id_producto}
              producto={producto}
              index={index + 1}
              onDetallesClick={onDetallesClick}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
