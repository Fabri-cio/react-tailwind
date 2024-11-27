import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  createUserRole,
  getUserRole,
  updateUserRole,
  deleteUserRole,
  getAllRoles,
} from "../../api/usuario.api";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

// Componente reutilizable para campos de entrada
const InputField = React.memo(
  ({ label, type = "text", register, name, errors, placeholder, rules }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        className={`mt-1 block w-full px-3 py-2 rounded ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name]?.message}</span>
      )}
    </div>
  )
);

export function FormUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ shouldUnregister: true });

  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id"); // ID del usuario

  // Lógica para cargar roles y datos del usuario
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rolesData } = await getAllRoles();
      setRoles(rolesData);

      if (id) {
        const { data: userRole } = await getUserRole(id);
        const { user, role } = userRole;
        setValue("username", user.username);
        setValue("full_name", user.full_name);
        setValue("telefono", user.telefono || "");
        setValue("is_active", user.is_active);
        setValue("role", role?.id || "");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, [id, setValue]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Reglas de validación
  const validationRules = {
    username: { required: "El nombre de usuario es obligatorio" },
    full_name: { required: "El nombre completo es obligatorio" },
    telefono: {
      pattern: { value: /^[0-9\-+()\s]+$/, message: "Número de teléfono inválido" },
    },
    role: { required: "El rol es obligatorio" },
  };

  // Opciones de roles con memoización
  const rolesOptions = useMemo(
    () =>
      roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      )),
    [roles]
  );

  // Manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const payload = {
        user: {
          username: data.username,
          full_name: data.full_name,
          telefono: data.telefono,
          is_active: Boolean(data.is_active),
        },
        role: parseInt(data.role, 10),
      };

      if (id) {
        await updateUserRole(id, payload);
        toast.success("Usuario actualizado con éxito");
      } else {
        await createUserRole(payload);
        toast.success("Usuario creado con éxito");
      }

      navigate("/usuarios/lista");
    } catch (error) {
      toast.error("Error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  });

  // Eliminar usuario
  const handleEliminarUsuario = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      setLoading(true);
      try {
        await deleteUserRole(id);
        toast.success("Usuario eliminado con éxito");
        navigate("/usuarios/lista");
      } catch (error) {
        toast.error("Error al eliminar el usuario");
      } finally {
        setLoading(false);
      }
    }
  };

  const fields = [
    { name: "username", label: "Nombre de Usuario", placeholder: "Usuario" },
    { name: "full_name", label: "Nombre Completo", placeholder: "Nombre completo" },
    { name: "telefono", label: "Teléfono", placeholder: "Número de teléfono" },
  ];

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {id ? "Actualizar Usuario" : "Crear Usuario"}
      </h2>
      <form onSubmit={onSubmit}>
        {fields.map(({ name, label, type = "text", placeholder }) => (
          <InputField
            key={name}
            label={label}
            type={type}
            register={register}
            name={name}
            errors={errors}
            placeholder={placeholder}
            rules={validationRules[name]}
          />
        ))}

        {/* Select de roles */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium">
            Rol
          </label>
          <select
            id="role"
            {...register("role", validationRules.role)}
            className={`mt-1 block w-full px-3 py-2 rounded ${
              errors.role ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Seleccione un rol</option>
            {rolesOptions}
          </select>
          {errors.role && (
            <span className="text-red-500 text-sm">{errors.role.message}</span>
          )}
        </div>

        {/* Checkbox de estado activo/inactivo */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            {...register("is_active")}
            className="form-checkbox"
          />
          <label htmlFor="is_active" className="block text-sm font-medium">
            Activo
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : id
              ? "Actualizar Usuario"
              : "Crear Usuario"}
          </button>
          {id && (
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleEliminarUsuario}
              disabled={loading}
            >
              Eliminar Usuario
            </button>
          )}
        </div>
      </form>

      {loading && (
        <div className="mt-4 text-center text-blue-500">Cargando...</div>
      )}
    </div>
  );
}

export default FormUsuario;
