import { useState } from "react";

export function useFormEntity(initialValues, selects = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleChange = (name, value) => {
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const getSelectOptions = (key) => {
    if (!selects[key]?.data || !Array.isArray(selects[key].data)) {
      console.warn(`⚠️ Warning: selects[${key}] no tiene un array válido.`);
      return [];
    }

    return selects[key].data.map(({ id, nombre }) => ({
      id,
      nombre,
    }));
  };
  
  return {
    formValues,
    setFormValues,
    handleInputChange,
    handleToggleChange,
    getSelectOptions,
  };
}
