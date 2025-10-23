import {
  useMovimientoMutations,
  useMovimiento,
  useInventariosSelect,
  useTiposMovimientosSelect,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { SelectField } from "../../../components/shared/SelectField";
import { FaEdit, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import { useFormEntity } from "../../../utils/useFormEntity";

export default function EditMovimiento() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const inventariosOptions = () =>
    paraSelectsdestructuringYMap(useInventariosSelect, "id", "producto_nombre");

  const tiposMovimientosOptions = () =>
    paraSelectsdestructuringYMap(useTiposMovimientosSelect, "id", "nombre");

  const selects = {
    inventariosOptions,
    tiposMovimientosOptions,
  };

  const configuracionFormulario = (entidad) => ({
    inventario: entidad?.data?.inventario || "",
    tipo: entidad?.data?.tipo || "",
    cantidad: entidad?.data?.cantidad || "",
  });

  const camposExtras = (formValues) => ({
    inventario: Number(formValues.inventario),
    tipo: Number(formValues.tipo),
    cantidad: Number(formValues.cantidad),
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_movimiento
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Inventario",
      name: "inventario",
      onChange: manejarEntradas.handleInputChange,
      options: selects.inventariosOptions(),
      actionButtons: [
        {
          to: `/editInventario/${formValues.inventario}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createInventario",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/inventarios",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: SelectField,
      label: "Tipo de Movimiento",
      name: "tipo",
      onChange: manejarEntradas.handleInputChange,
      options: selects.tiposMovimientosOptions(),
      actionButtons: [
        {
          to: `/editTipoMovimiento/${formValues.tipo}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createTipoMovimiento",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/tiposMovimientos",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: InputField,
      label: "Cantidad",
      name: "cantidad",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },

    {
      component: InputField,
      label: "Comentario de Modificación",
      name: "comentario_modificacion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Movimiento",
    subTitle: "Actualice los datos del movimiento",
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
      useEntityMutations={useMovimientoMutations}
      useEntity={useMovimiento}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
