import React from "react";
import { InputField, SelectField, ToggleSwitch, CreateEntity } from "../../components/shared"
import { useFormEntity } from "../../utils/useFormEntity";
import { useProveedores, useCategorias, useProductMutations } from "../../hooks/useEntities";
import { obtenerIdUser } from "../../utils/auth";
import { FaBackspace, FaPlus } from "react-icons/fa";

export default function CreateProductStandalone() {
  const { paraSelectsdestructuringYMap } = useFormEntity();
  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(
      useProveedores,
      true,
      "id_proveedor",
      "nombre_proveedor"
    );

  const categoriasOptions = () =>
    paraSelectsdestructuringYMap(
      useCategorias,
      true,
      "id_categoria",
      "nombre_categoria"
    );

  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    precio: "",
    codigo_barras: "",
    id_proveedor: "",
    categoria: "",
    estado: false,
    imagen: "",
    documento: "",
  };

  const camposExtras = (formValues) => ({
    id_proveedor: Number(formValues.id_proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    usuario_creacion: logicaNegocio.idUsuario,
    imagen: formValues.imagen || null,
    documento: formValues.documento || null,
  });

  const paraEnvio = (formValues) => ({
    link: "/productList",
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField, // Nombre corregido
      label: "Nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Precio",
      name: "precio",
      type: "number",
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
      name: "id_proveedor",
      options: proveedoresOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      options: categoriasOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      required: true,
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
    {
      component: InputField,
      label: "Documento",
      name: "documento",
      type: "file",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Registrar Producto",
    subTitle: "",
    icon: FaPlus,
    actions: [
      {
        to: "/productList",
        label: "Cancelar",
        estilos: "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
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
