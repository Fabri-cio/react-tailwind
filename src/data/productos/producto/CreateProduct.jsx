import React from "react";
import {
  InputField,
  SelectField,
  ToggleSwitch,
  CreateEntity,
} from "../../../components/shared";
import { useFormEntity } from "../../../utils/useFormEntity";
import {
  useProveedores,
  useCategorias,
  useProductMutations,
} from "../../../hooks/useEntities";
import { FaEye, FaPlus } from "react-icons/fa";
import ImagePreview from "../../../components/shared/ImagePreview";

export default function CreateProduct() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(useProveedores, "id", "marca");

  const categoriasOptions = () =>
    paraSelectsdestructuringYMap(useCategorias, "id", "nombre");

  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    precio: "",
    codigo_barras: "",
    proveedor: "",
    categoria: "",
    estado: false,
    imagen: "",
  };

  const camposExtras = (formValues) => ({
    proveedor: Number(formValues.proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    imagen: formValues.imagen || null,
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
      label: "Precio",
      name: "precio",
      type: "float",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Código de Barras",
      name: "codigo_barras",
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
      actionButtons: [
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
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      options: categoriasOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
      actionButtons: [
        {
          to: "/createCategoria",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categorias",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
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
      name: "imagen",
      component: () => (
        <div className="space-y-2">
          <div className="font-medium text-gray-700">Imagen actual</div>
          <ImagePreview
            image={formValues.imagen}
            alt={`Imagen de ${formValues.nombre || "producto"}`}
            className="h-40 w-40 mb-4"
          />
          <InputField
            label="Cambiar imagen"
            name="imagen"
            type="file"
            accept="image/*"
            onChange={manejarEntradas.handleInputChange}
          />
        </div>
      ),
    },
  ];

  const paraNavegacion = {
    title: "Registrar Producto",
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
      useEntityMutations={useProductMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
