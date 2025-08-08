import React from "react";
import {
  InputField,
  SelectField,
  CreateEntity,
} from "../../../components/shared";
import { useTipoMovimientoMutations } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";

export default function CreateTipoMovimiento() {
  const naturalezaOptions = () => [
    { id: "Entrada", nombre: "Entrada" },
    { id: "Salida", nombre: "Salida" },
  ];

  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    descripcion: "",
    naturaleza: "",
  };

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    descripcion: formValues.descripcion,
    naturaleza: formValues.naturaleza,
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
      label: "Descripción",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Naturaleza",
      name: "naturaleza",
      options: naturalezaOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Tipo de Movimiento",
    subTitle: "",
    icon: FaPlus,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        estilos:
          "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <CreateEntity
      useEntityMutations={useTipoMovimientoMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
