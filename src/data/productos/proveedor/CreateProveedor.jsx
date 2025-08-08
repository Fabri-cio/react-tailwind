import React from "react";
import {
  InputField,
  ToggleSwitch,
  CreateEntity,
} from "../../../components/shared";
import { useProveedorMutations } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";

export default function CreateProveedor() {
  const estadoInicial = {
    marca: "",
    nombre_contacto: "",
    telefono: "",
    estado: false,
    imagen: "",
  };

  const camposExtras = (formValues) => ({
    imagen: formValues.imagen || null,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Marca",
      name: "marca",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nombre de Contacto",
      name: "nombre_contacto",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Telefono",
      name: "telefono",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      required: false,
      onChange: manejarEntradas.handleToggleChange("estado"),
    },
    {
      component: InputField,
      label: "Imagen",
      name: "imagen",
      type: "file",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Proveedor",
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
      useEntityMutations={useProveedorMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
