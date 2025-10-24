import {
  usePedidoMutations,
  usePedido,
  useProveedoresSelect,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { FaEdit, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import { useFormEntity } from "../../../utils/useFormEntity";
import DetallePedidoForm from "../../../components/shared/DetallePedidoForm";

export default function EditPedido() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(useProveedoresSelect, "id", "marca");

  const selects = {
    proveedoresOptions,
  };

  const configuracionFormulario = (entidad) => ({
    fecha_entrega: entidad?.data?.fecha_entrega || "",
    observaciones: entidad?.data?.observaciones || "",
    proveedor: entidad?.data?.proveedor || "",
    detalles: entidad?.data?.detalles || [],
  });

  const camposExtras = (formValues) => ({
    proveedor: Number(formValues.proveedor),
    detalles: formValues.detalles,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_pedido
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
      onChange: manejarEntradas.handleInputChange,
      options: selects.proveedoresOptions(),
      actionButtons: [
        {
          to: `/editProveedor/${formValues.proveedor}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createProveedor",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/proveedores",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: DetallePedidoForm,
      label: "Detalles",
      name: "detalles",
      required: true,
      onChange: manejarEntradas.handleToggleChange("detalles"),
    },
    {
      component: InputField,
      label: "Observaciones",
      name: "observaciones",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Pedido",
    subTitle: "Actualice los datos del pedido",
    icon: FaEdit,
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
    <EditEntity
      useEntityMutations={usePedidoMutations}
      useEntity={usePedido}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
