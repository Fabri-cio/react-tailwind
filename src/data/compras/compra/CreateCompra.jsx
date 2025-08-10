import React, { useState, useEffect } from "react";
import { InputField, CreateEntity } from "../../../components/shared";
import { useCompraMutations, usePedido } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";
import DetalleCompraForm from "../../../components/shared/DetalleCompraForm";
import { useParams } from "react-router-dom";

export default function CreateCompra() {
  const params = useParams();
  const { data: pedido } = usePedido(params.id);

  const estadoInicial = {
    observaciones: "",
    descuento: "",
    detalles: [], // se llenará con datos del pedido
    total_compra: 0,
  };

  // Estado para manejar el formulario
  const [formValues, setFormValues] = useState(estadoInicial);

  // Cargar detalles desde el pedido cuando esté disponible
  useEffect(() => {
    if (pedido?.detalles) {
      const detallesConvertidos = pedido.detalles.map((d) => ({
        inventario: d.inventario, // ID de inventario
        cantidad: d.cantidad_solicitada, // cantidad pedida
        precio_unitario: 0,
        descuento_unitario: 0,
        subtotal: 0,
      }));
      setFormValues((prev) => ({
        ...prev,
        detalles: detallesConvertidos,
      }));
    }
  }, [pedido]);

  const camposExtras = (values) => ({
    pedido: pedido?.id, // relacionar la compra con el pedido
    descuento: parseFloat(values.descuento || 0).toFixed(2),
    detalles: values.detalles,
  });

  const paraEnvio = (values) => ({
    link: -1,
    params: camposExtras(values),
  });

  const construirCampos = (values, manejarEntradas) => [
    {
      component: InputField,
      label: "Observaciones",
      name: "observaciones",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Descuento",
      name: "descuento",
      type: "number",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: DetalleCompraForm,
      label: "Detalles",
      name: "detalles",
      required: true,
      onChange: (nuevoDetalle) =>
        manejarEntradas.handleToggleChange("detalles")(nuevoDetalle),
    },
    {
      component: InputField,
      label: "Total de la Compra",
      name: "total_compra",
      type: "number",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Recepción de Pedido",
    subTitle: `Pedido #${pedido?.id || ""} - ${pedido?.nombre_proveedor || ""}`,
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
      useEntityMutations={useCompraMutations}
      configForm={formValues}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
