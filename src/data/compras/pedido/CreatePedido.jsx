import React from "react";
import {
  InputField,
  SelectField,
  CreateEntity,
} from "../../../components/shared";
import { useFormEntity } from "../../../utils/useFormEntity";
import { useProveedores, usePedidoMutations } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";
import DetallePedidoForm from "../../../components/shared/DetallePedidoForm";

export default function CreatePedido() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(useProveedores, "id", "marca");

  // Estado inicial del formulario
  const estadoInicial = {
    fecha_entrega: "",
    observaciones: "",
    proveedor: "",
    detalles: [{ producto: "", cantidad_solicitada: 1 }],
  };

  const camposExtras = (formValues) => ({
    fecha_entrega: formValues.fecha_entrega,
    proveedor: Number(formValues.proveedor),
    observaciones: formValues.observaciones || null,
    detalles: formValues.detalles,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Fecha de Entrega",
      name: "fecha_entrega",
      type: "date",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Proveedor",
      name: "proveedor",
      options: proveedoresOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: DetallePedidoForm,
      label: "Detalles",
      isCompra: false,
      name: "detalles",
      required: true,
      onChange: (nuevoDetalle) =>
        manejarEntradas.handleToggleChange("detalles")(nuevoDetalle),
    },
    {
      component: InputField,
      label: "Observaciones",
      name: "observaciones",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Pedido",
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
      useEntityMutations={usePedidoMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
