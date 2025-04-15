export const Reporte = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Reporte de Inventarios</h1>
        <p className="text-sm text-gray-600">
          Generado el: {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Resumen</h2>
        <p className="text-gray-800">
          Este es un informe que muestra el estado actual de los inventarios en
          cada tienda.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Detalle de Inventarios</h2>
        <table className="w-full table-auto mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Producto</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Stock Mínimo</th>
              <th className="border px-4 py-2">Tienda/Almacén</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Producto A</td>
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">10</td>
              <td className="border px-4 py-2">Tienda 1</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Producto B</td>
              <td className="border px-4 py-2">30</td>
              <td className="border px-4 py-2">5</td>
              <td className="border px-4 py-2">Tienda 2</td>
            </tr>
            {/* Aquí puedes agregar más filas según el inventario */}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Reporte;
