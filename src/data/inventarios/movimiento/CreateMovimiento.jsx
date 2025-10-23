import React from "react";
import {
  InputField,
  SelectField,
  CreateEntity,
} from "../../../components/shared";
import { useFormEntity } from "../../../utils/useFormEntity";
import {
  useInventariosSelect,
  useTiposMovimientosSelect,
  useMovimientoMutations,
} from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";

export default function CreateMovimiento() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const inventariosOptions = () =>
    paraSelectsdestructuringYMap(useInventariosSelect, "id", "producto_nombre");

  const tiposMovimientosOptions = () =>
    paraSelectsdestructuringYMap(
      useTiposMovimientosSelect,
      "id",
      "nombre"
    );

  // Estado inicial del formulario
  const estadoInicial = {
    inventario: "",
    tipo: "",
    cantidad: "",
  };

  const camposExtras = (formValues) => ({
    inventario: Number(formValues.inventario),
    tipo: Number(formValues.tipo),
    cantidad: Number(formValues.cantidad),
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Inventario",
      name: "inventario",
      options: inventariosOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Tipo de Movimiento",
      name: "tipo",
      options: tiposMovimientosOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Cantidad",
      name: "cantidad",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Movimiento",
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
      useEntityMutations={useMovimientoMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
