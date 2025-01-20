import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado
import { CustomUserAPI } from "../../api/usuario.api"; // Importar la API adecuada

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await CustomUserAPI.getAll(); // Usar el método genérico para obtener usuarios
        setUsers(response.data); // Setear los usuarios en el estado
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    loadUsers();
  }, []); // El array vacío significa que esto se ejecutará una sola vez al montar el componente

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">N°</th>
            <th className="px-4 py-2 text-left">Nombres</th>
            <th className="px-4 py-2 text-left">Apellidos</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Rol</th>
            <th className="px-4 py-2 text-left">Nombre de Usuario</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.first_name || "N/A"}</td>
              <td className="px-4 py-2">{user.last_name || "N/A"}</td>
              <td className="py-3 px-4 text-center">
                {user.is_active ? (
                  <span className="inline-block bg-green-200 text-green-700 px-2 py-1 rounded-full text-sm">
                    Activo
                  </span>
                ) : (
                  <span className="inline-block bg-red-200 text-red-700 px-2 py-1 rounded-full text-sm">
                    Inactivo
                  </span>
                )}
              </td>
              <td className="px-4 py-2">{user.name_rol}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
