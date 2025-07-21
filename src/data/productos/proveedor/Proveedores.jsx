import React from "react";
import { FaBuilding, FaPhone, FaEnvelope, FaEdit, FaTrash } from "react-icons/fa";

const proveedores = [
  { id: 1, nombre: "Distribuidora López", contacto: "Carlos López", telefono: "987-654-321", email: "contacto@lopez.com" },
  { id: 2, nombre: "Importaciones García", contacto: "Ana García", telefono: "965-123-789", email: "ventas@garcia.com" },
  { id: 3, nombre: "Mayorista Express", contacto: "Mario Pérez", telefono: "998-456-123", email: "info@express.com" },
];

const Proveedores = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Proveedores</h1>

      {/* Tabla de proveedores */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Proveedor</th>
              <th className="px-4 py-3 text-left">Contacto</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-4 py-3 flex items-center">
                  <FaBuilding className="text-blue-500 mr-2" />
                  {proveedor.nombre}
                </td>
                <td className="px-4 py-3">{proveedor.contacto}</td>
                <td className="px-4 py-3 items-center">
                  <FaPhone className="text-green-500 mr-2" />
                  {proveedor.telefono}
                </td>
                <td className="px-4 py-3 items-center">
                  <FaEnvelope className="text-red-500 mr-2" />
                  {proveedor.email}
                </td>
                <td className="px-4 py-3 flex justify-center space-x-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition">
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proveedores;
