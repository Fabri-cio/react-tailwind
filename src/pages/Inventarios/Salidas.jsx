import React from "react";

const Salidas = ({ salidas }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border">N°</th>
            <th className="px-4 py-2 border">Salida</th>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Cantidad</th>
            <th className="px-4 py-2 border">Monto Bs.</th>
            <th className="px-4 py-2 border">Responsable</th>
            <th className="px-4 py-2 border">Motivo</th>
            <th className="px-4 py-2 border">Observación</th>
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

export default Salidas;
