import React from "react";
import { InputField, CreateEntity } from "../../../components/shared";
import { useClienteMutations } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";

export default function CreateCliente() {
  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    correo: "",
    nit_ci: "",
  };

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    correo: formValues.correo,
    nit_ci: formValues.nit_ci,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Correo",
      name: "correo",
      type: "email",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "NIT/CI",
      name: "nit_ci",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Cliente",
    subTitle: "",
    icon: FaPlus,
    actions: [
      {
        to: "/realizarVenta",
        label: "Cancelar",
        estilos:
          "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useClienteMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
