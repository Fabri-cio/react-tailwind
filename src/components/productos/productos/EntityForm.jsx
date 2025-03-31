import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Navigation } from "../../../components/shared/Navigation";
import { FaEdit } from "react-icons/fa";
import { useFormEntity } from "./useFormEntity";

export default function EntityForm({
  title,
  subtitle,
  initialValues,
  selects = {},
  entityData,
  mutationHooks,
  inputs,
  toggleFields = [],
  redirectPath,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { crear, actualizar } = mutationHooks;
  const idUsuario = () => localStorage.getItem("id_usuario");

  const {
    formValues,
    setFormValues,
    handleInputChange,
    handleToggleChange,
    getSelectOptions,
  } = useFormEntity(initialValues, selects);

  useEffect(() => {
    if (entityData?.data) {
      setFormValues((prevState) => ({
        ...prevState,
        ...entityData.data,
      }));
    }
  }, [entityData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formValues,
      usuario_modificacion: idUsuario(),
      ...(id ? {} : { usuario_creacion: idUsuario() }),
    };

    const mutation = id ? actualizar : crear;
    mutation.mutate(
      { id: id || undefined, data: dataToSend },
      { onSuccess: () => navigate(redirectPath) }
    );
  };

  return (
    <div className="max-w-4xl bg-gray-400 shadow-lg rounded-lg px-3 py-2 mx-60">
      <Navigation title={title} subTitle={subtitle} icon={FaEdit} />

      <form onSubmit={handleSubmit} className="space-y-4 py-2">
        {inputs.map(({ label, name, type, required }) => (
          <InputField
            key={name}
            label={label}
            type={type || "text"}
            name={name}
            value={formValues[name]}
            onChange={handleInputChange}
            required={required}
          />
        ))}

        {Object.keys(selects).map((key) => (
          <SelectField
            key={key}
            label={selects[key].label}
            name={key}
            value={formValues[key]}
            onChange={handleInputChange}
            options={getSelectOptions(key)}
          />
        ))}

        {toggleFields.map((field) => (
          <ToggleSwitch
            key={field.name}
            label={field.label}
            checked={formValues[field.name]}
            onChange={(value) => handleToggleChange(field.name, value)}
          />
        ))}

        <ActionButton
          type="submit"
          label={id ? "Guardar Cambios" : "Crear"}
          estilos="bg-blue-400 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
          disabled={crear.isLoading || actualizar.isLoading}
        />
      </form>
    </div>
  );
}
