import { InputField, CreateEntity } from "../../../components/shared";
import { useCompraMutations, usePedido } from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DetallePedidoForm from "../../../components/shared/DetallePedidoForm";

export default function CreateCompra() {
  const params = useParams();
  const { data: pedido = {} } = usePedido(params.id);

  const estadoInicial = {
    nro_factura: "",
    razon_social: "",
    subtotal_compra: 0,
    descuento: 0,
    total_compra: 0,
    detalles: pedido?.detalles || [],
    observaciones: "",
  };

  const camposExtras = (formValues) => ({
    pedido: pedido?.id, // relacionar la compra con el pedido
    descuento: parseFloat(formValues.descuento || 0).toFixed(2),
    detalles: formValues.detalles,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nro. de Factura",
      name: "nro_factura",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Razón Social",
      name: "razon_social",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Subtotal",
      name: "subtotal_compra",
      type: "number",
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
      component: DetallePedidoForm,
      label: "Detalles",
      name: "detalles",
      isCompra: true,
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
    {
      component: InputField,
      label: "Observaciones",
      name: "observaciones",
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
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
