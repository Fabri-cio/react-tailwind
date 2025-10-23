import {
  useInventarioMutations,
  useAlmacenesSelect,
  useProductsSelect,
  useInventario,
} from "../../../hooks/useEntities";
import { InputField, SelectField } from "../../../components/shared";
import { FaEdit, FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import { useFormEntity } from "../../../utils/useFormEntity";

export default function EditInventario() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const productosOptions = () =>
    paraSelectsdestructuringYMap(useProductsSelect, "id", "nombre");

  const almacenesOptions = () =>
    paraSelectsdestructuringYMap(useAlmacenesSelect, "id", "nombre");

  const selects = {
    productosOptions,
    almacenesOptions,
  };

  const configuracionFormulario = (entidad) => ({
    producto: entidad?.data?.producto || "",
    almacen: entidad?.data?.almacen || "",
    cantidad: entidad?.data?.cantidad || "",
    stock_minimo: entidad?.data?.stock_minimo || "",
    stock_maximo: entidad?.data?.stock_maximo || "",
  });

  const camposExtras = (formValues) => ({
    producto: Number(formValues.producto),
    almacen: Number(formValues.almacen),
    cantidad: Number(formValues.cantidad),
    stock_minimo: Number(formValues.stock_minimo),
    stock_maximo: Number(formValues.stock_maximo),
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_inventario
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Producto",
      name: "producto",
      onChange: manejarEntradas.handleInputChange,
      options: selects.productosOptions(),
      actionButtons: [
        {
          to: `/editProduct/${formValues.producto}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createProduct",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/productos",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: SelectField,
      label: "Almacén",
      name: "almacen",
      onChange: manejarEntradas.handleInputChange,
      options: selects.almacenesOptions(),
      actionButtons: [
        {
          to: `/editAlmacen/${formValues.almacen}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/createAlmacen",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/almacenes",
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
      label: "Stock Mínimo",
      name: "stock_minimo",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Stock Máximo",
      name: "stock_maximo",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Comentario de Modificación",
      name: "comentario_modificacion",
      required: false,
      type: "text",
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Inventario",
    subTitle: "Actualice los datos del inventario",
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
      useEntityMutations={useInventarioMutations}
      useEntity={useInventario}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
