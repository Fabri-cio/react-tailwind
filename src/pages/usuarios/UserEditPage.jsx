import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Importa useNavigate y useParams
import { CustomUserAPI } from "../../api/usuario.api";  // Importa la API adecuada

const UserEditPage = () => {
  const navigate = useNavigate(); // Para redirigir después de guardar
  const { id } = useParams(); // Para obtener el ID del usuario desde la URL

  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    birthday: '',
    password: '', // Campo para la contraseña
    is_superuser: false, // Campo para el estado de superusuario
    is_active: true, // Estado de activo o no
    date_joined: '', // Fecha de incorporación
    last_login: '', // Último inicio de sesión
    groups: [], // Grupos a los que pertenece
    user_permissions: [], // Permisos del usuario
    workplace: '', // Lugar de trabajo
  });

  const [allGroups, setAllGroups] = useState([]); // Todos los grupos disponibles
  const [allPermissions, setAllPermissions] = useState([]); // Todos los permisos disponibles
  const [newGroup, setNewGroup] = useState(""); // Nuevo grupo a crear

  useEffect(() => {
    // Cargar los datos del usuario cuando se monta el componente
    const loadUserData = async () => {
      try {
        const response = await CustomUserAPI.getOne(id);  // Usar el método genérico para obtener el usuario por su ID
        setUserData(response.data); // Establecer los datos del usuario en el estado
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      }
    };

    const loadAvailableGroupsAndPermissions = async () => {
      try {
        const groupsResponse = await CustomUserAPI.getGroups(); // Método que obtiene los grupos
        const permissionsResponse = await CustomUserAPI.getPermissions(); // Método que obtiene los permisos
        setAllGroups(groupsResponse.data);
        setAllPermissions(permissionsResponse.data);
      } catch (error) {
        console.error("Error al cargar los grupos y permisos:", error);
      }
    };

    loadUserData();
    loadAvailableGroupsAndPermissions();
  }, [id]); // El array de dependencias contiene el ID para recargar cuando cambie

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleGroupChange = (e) => {
    const { value, checked } = e.target;
    setUserData({
      ...userData,
      groups: checked
        ? [...userData.groups, value] // Añadir el grupo seleccionado
        : userData.groups.filter(groupId => groupId !== value), // Eliminar el grupo deseleccionado
    });
  };

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setUserData({
      ...userData,
      user_permissions: checked
        ? [...userData.user_permissions, value] // Añadir el permiso seleccionado
        : userData.user_permissions.filter(permissionId => permissionId !== value), // Eliminar el permiso deseleccionado
    });
  };

  const handleCreateGroup = async () => {
    try {
      const response = await CustomUserAPI.createGroup({ name: newGroup });
      setAllGroups([...allGroups, response.data]);
      setNewGroup("");  // Limpiar el campo
    } catch (error) {
      console.error("Error al crear el grupo:", error);
    }
  };

  const handleSave = async () => {
    try {
      await CustomUserAPI.update(id, userData);  // Actualizar el usuario con los nuevos datos
      navigate("/listusers");  // Redirigir a la lista de usuarios después de guardar
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Usuario</h1>
      <form>
        {/* Campos de texto */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthday"
            value={userData.birthday}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Campos de checkbox */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Activo</label>
          <input
            type="checkbox"
            name="is_active"
            checked={userData.is_active}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Superusuario</label>
          <input
            type="checkbox"
            name="is_superuser"
            checked={userData.is_superuser}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Grupos */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Grupos</label>
          <div className="space-y-2">
            {allGroups.map((group) => (
              <div key={group.id}>
                <input
                  type="checkbox"
                  name="groups"
                  value={group.id}
                  checked={userData.groups.includes(group.id)}
                  onChange={handleGroupChange}
                  className="mr-2"
                />
                <span>{group.name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Nuevo Grupo</label>
            <input
              type="text"
              name="newGroup"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              className="mt-1 p-2 border rounded w-full"
            />
            <button
              type="button"
              onClick={handleCreateGroup}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Crear Grupo
            </button>
          </div>
        </div>

        {/* Permisos */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Permisos</label>
          <div className="space-y-2">
            {allPermissions.map((permission) => (
              <div key={permission.id}>
                <input
                  type="checkbox"
                  name="user_permissions"
                  value={permission.id}
                  checked={userData.user_permissions.includes(permission.id)}
                  onChange={handlePermissionChange}
                  className="mr-2"
                />
                <span>{permission.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lugar de trabajo */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Lugar de trabajo</label>
          <input
            type="text"
            name="workplace"
            value={userData.workplace}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>

        {/* Botón para guardar */}
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
