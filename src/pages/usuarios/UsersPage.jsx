import React from "react";
import { Link } from "react-router-dom";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Navigation } from "@/components/usuarios/Navigation";

function Usuarios() {
  const { userRoles, loading, error } = useUserRoles();

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  // Componente para una fila de la tabla
  const UsuarioRow = ({ userRole }) => {
    const { user, role } = userRole;
    const { id, username, full_name, telefono, is_active } = user;

    return (
      <tr className="bg-gray-100 hover:bg-gray-200">
        <td className="py-2 px-4 border-b border-gray-200">{username}</td>
        <td className="py-2 px-4 border-b border-gray-200">{full_name}</td>
        <td className="py-2 px-4 border-b border-gray-200">{telefono || "-"}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          {is_active ? "Activo" : "Inactivo"}
        </td>
        <td className="py-2 px-4 border-b border-gray-200">{role.name}</td>
        <td className="py-2 px-4 border-b border-gray-200">
          <Link
            to={`/usuarios/formUsuario?id=${id}`}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Editar
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <Navigation />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Usuario</th>
            <th className="py-2 px-4 border-b border-gray-200">Nombre Completo</th>
            <th className="py-2 px-4 border-b border-gray-200">Teléfono</th>
            <th className="py-2 px-4 border-b border-gray-200">Estado</th>
            <th className="py-2 px-4 border-b border-gray-200">Rol</th>
            <th className="py-2 px-4 border-b border-gray-200">Actualizar</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.map((userRole) => (
            <UsuarioRow key={userRole.id} userRole={userRole} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
