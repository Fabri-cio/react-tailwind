import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";  // Importa useNavigate y useParams
import { CustomUserAPI } from "@/api/usuario.api";  // Importa la API adecuada

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
    name_work: '', // Lugar de trabajo
    name_rol:'',
  });

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

    loadUserData();
  }, [id]); // El array de dependencias contiene el ID para recargar cuando cambie

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
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
          <label className="block text-sm font-medium">Nombres</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Apellidos</label>
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

        {/* Lugar de trabajo */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Lugar de trabajo</label>
          <input
            type="text"
            name="workplace"
            value={userData.name_work}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        {/* Lugar de trabajo */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Rol</label>
          <input
            type="text"
            name="workplace"
            value={userData.name_rol}
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
