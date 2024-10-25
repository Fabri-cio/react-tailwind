import React from "react";

const Entradas = ({ entradas }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Producto</th>
            <th className="px-4 py-2 border">Categoría</th>
            <th className="px-4 py-2 border">Cantidad</th>
            <th className="px-4 py-2 border">Fecha de Entrada</th>
            <th className="px-4 py-2 border">Proveedor</th>
            <th className="px-4 py-2 border">Costo Unitario</th>
            <th className="px-4 py-2 border">Responsable</th>
            <th className="px-4 py-2 border">Comentarios</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
            <td className="px-4 py-2 border"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Entradas;
