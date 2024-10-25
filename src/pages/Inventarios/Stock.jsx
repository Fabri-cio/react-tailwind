import React from 'react';

const Stock = ({ stockData }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Producto</th>
            <th className="px-4 py-2 border">Categoría</th>
            <th className="px-4 py-2 border">Cantidad en Stock</th>
            <th className="px-4 py-2 border">Stock Mínimo</th>
            <th className="px-4 py-2 border">Stock Máximo</th>
            <th className="px-4 py-2 border">Última Actualización</th>
            <th className="px-4 py-2 border">Estado</th>
          </tr>
        </thead>
        <tbody>
        
            <tr key={producto.id} className="text-center">
              <td className="px-4 py-2 border">{producto.nombre}</td>
              <td className="px-4 py-2 border">{producto.categoria}</td>
              <td className="px-4 py-2 border">{producto.cantidad}</td>
              <td className="px-4 py-2 border">{producto.stockMinimo}</td>
              <td className="px-4 py-2 border">{producto.stockMaximo}</td>
              <td className="px-4 py-2 border">{producto.ultimaActualizacion}</td>
              <td className={`px-4 py-2 border ${producto.estado === 'Bajo' ? 'bg-red-200' : producto.estado === 'Sobrestock' ? 'bg-yellow-200' : 'bg-green-200'}`}>
                {producto.estado}
              </td>
            </tr>

        </tbody>
      </table>
    </div>
  );
};

export default Stock;
