import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useAlmacenes,
  useRoles,
  useUser,
  useUserMutations,
} from "../../hooks/useEntities";
import { InputField } from "@/components/shared/InputField";
import { SelectField } from "@/components/shared/SelectField";
import { ToggleSwitch } from "@/components/shared/ToggleSwitch";
import { ActionButton } from "@/components/shared/ActionButton";
import { FaArrowLeft } from "react-icons/fa";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { crear, actualizar } = useUserMutations();
  const { data: { data: almacenTiendas = [] } = {} } = useAlmacenes();
  const { data: { data: roles = [] } = {} } = useRoles();
  const { data: user, isLoading } = useUser(id);

  const [formValues, setFormValues] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    is_active: true,
    birthday: "",
    username: "",
    lugar_de_trabajo: "",
    role: "",
  });

  const almacenTiendasOptions = () =>
    almacenTiendas.map(({ id_almacen_tienda, nombre }) => ({
      id: id_almacen_tienda,
      nombre: nombre,
    }));

  const rolesOptions = () =>
    roles.map(({ id, name }) => ({
      id: id,
      nombre: name,
    }));

  useEffect(() => {
    if (user?.data) {
      const {
        id,
        email,
        first_name,
        last_name,
        is_active,
        birthday,
        username,
        lugar_de_trabajo,
        role,
      } = user.data;
      setFormValues({
        id: id || "",
        email: email || "",
        first_name: first_name || "",
        last_name: last_name || "",
        is_active: is_active ?? true,
        birthday: birthday || "",
        username: username || "",
        lugar_de_trabajo: lugar_de_trabajo || "",
        role: role || "",
      });
    }
  }, [user]);

  const handleInputChange = useCallback((e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleToggleChange = (value) => {
    setFormValues((prevState) => ({ ...prevState, is_active: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id, ...data } = formValues;

    const dataToSend = {
      ...data,
      lugar_de_trabajo: Number(formValues.lugar_de_trabajo),
      role: Number(formValues.role),
    };

    const mutation = id ? actualizar: crear;
    mutation.mutate(
      { id: id || undefined, data: dataToSend },
      { onSuccess: () => navigate("/userList") }
    );
  };

  if (isLoading) return <p>Cargando producto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <ActionButton
          to="/userList"
          label="Volver"
          icon={FaArrowLeft}
          color="blue"
        />
        <h1 className="text-2xl font-semibold text-blue-900">
          {formValues.id ? "Editar Usuario" : "Crear Usuario"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Nombres"
          type="text"
          name="first_name"
          value={formValues.first_name}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Apellidos"
          type="text"
          name="last_name"
          value={formValues.last_name}
          onChange={handleInputChange}
          required
        />
        <InputField
          label="Nombre de Usuario"
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
        />
        <InputField
          label="Correo Electrónico"
          type="text"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
        />
        <InputField
          label="Fecha de Nacimiento"
          type="date"
          name="birthday"
          value={formValues.birthday}
          onChange={handleInputChange}
        />
        <ToggleSwitch
          label="Estado"
          checked={formValues.is_active}
          onChange={handleToggleChange}
        />
        <SelectField
          label="Lugar de Trabajo"
          name="lugar_de_trabajo"
          value={formValues.lugar_de_trabajo}
          onChange={handleInputChange}
          options={almacenTiendasOptions()}
        />
        <SelectField
          label="Rol"
          name="role"
          value={formValues.role}
          onChange={handleInputChange}
          options={rolesOptions()}
        />
        <ActionButton
          type="submit"
          label={formValues.id ? "Guardar Cambios" : "Crear Usuario"}
          color="blue"
          disabled={crear.isLoading || actualizar.isLoading}
        />
      </form>
    </div>
  );
}
