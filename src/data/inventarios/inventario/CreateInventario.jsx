import React from "react";
import {
  InputField,
  SelectField,
  CreateEntity,
} from "../../../components/shared";
import { useFormEntity } from "../../../utils/useFormEntity";
import {
  useAlmacenes,
  useProducts,
  useInventarioMutations,
} from "../../../hooks/useEntities";
import { FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";

export default function CreateInventario() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const almacenesOptions = () =>
    paraSelectsdestructuringYMap(useAlmacenes, "id", "nombre");

  const productosOptions = () =>
    paraSelectsdestructuringYMap(useProducts, "id", "nombre");

  // Estado inicial del formulario
  const estadoInicial = {
    producto: "",
    almacen: "",
    cantidad: "",
    stock_minimo: "",
    stock_maximo: "",
    comentario_modificacion: "",
  };

  const camposExtras = (formValues) => ({
    producto: Number(formValues.producto),
    almacen: Number(formValues.almacen),
    cantidad: Number(formValues.cantidad),
    stock_minimo: Number(formValues.stock_minimo),
    stock_maximo: Number(formValues.stock_maximo),
    comentario_modificacion: formValues.comentario_modificacion,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: SelectField,
      label: "Producto",
      name: "producto",
      options: productosOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
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
      options: almacenesOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
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
  ];

  const paraNavegacion = {
    title: "Registrar Inventario",
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
      useEntityMutations={useInventarioMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
