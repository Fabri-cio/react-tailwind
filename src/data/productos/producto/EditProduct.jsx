import {
  useProductMutations,
  useCategorias,
  useProveedores,
  useProduct,
} from "../../../hooks/useEntities";
import { InputField } from "../../../components/shared/InputField";
import { ToggleSwitch } from "../../../components/shared/ToggleSwitch";
import { SelectField } from "../../../components/shared/SelectField";
import ImagePreview from "../../../components/shared/ImagePreview";
import {
  FaEdit,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import EditEntity from "../../../components/shared/EditEntity";
import { useFormEntity } from "../../../utils/useFormEntity";

export default function EditProduct() {

  const { paraSelectsdestructuringYMap } = useFormEntity();

  const categoriasOptions = () =>
    paraSelectsdestructuringYMap(
      useCategorias,
      "id",
      "nombre"
    );

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(
      useProveedores,
      "id",
      "marca"
    );

  const selects = {
    categoriasOptions,
    proveedoresOptions,
  };

  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    precio: entidad?.data?.precio || "",
    codigo_barras: entidad?.data?.codigo_barras || "",
    proveedor: entidad?.data?.proveedor || "",
    categoria: entidad?.data?.categoria || "",
    estado: entidad?.data?.estado || false,
    imagen: entidad?.data?.imagen || null,
    documento: entidad?.data?.documento || null,
  });

  const camposExtras = (formValues) => ({
    proveedor: Number(formValues.proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    imagen: formValues.imagen,
    documento: formValues.documento
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_producto
    link: -1,
    params: camposExtras(formValues)
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
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Codigo de Barras",
      name: "codigo_barras",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Categoría",
      name: "categoria",
      onChange: manejarEntradas.handleInputChange,
      options: selects.categoriasOptions(),
      actionButtons: [
        {
          to: `/editCategoria/${formValues.categoria}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
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
      component: ToggleSwitch,
      label: "Estado del Producto",
      name: "estado",
      checked: formValues.estado,
      onChange: manejarEntradas.handleToggleChange("estado"),
    },
    {
      name: 'imagen',
      component: () => (
        <div className="space-y-2">
          <div className="font-medium text-gray-700">Imagen actual</div>
          <ImagePreview 
            image={formValues.imagen} 
            alt={`Imagen de ${formValues.nombre || 'producto'}`}
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
    // {
    //   name: 'documento',
    //   component: () => (
    //     <div className="space-y-2">
    //       {formValues.documento && (
    //         <div className="mb-2">
    //           <span className="block text-sm font-medium text-gray-700 mb-1">Documento actual:</span>
    //           <a 
    //             href={formValues.documento} 
    //             target="_blank" 
    //             rel="noopener noreferrer"
    //             className="text-blue-600 hover:underline text-sm"
    //           >
    //             Ver documento actual
    //           </a>
    //         </div>
    //       )}
    //       <InputField
    //         label={formValues.documento ? "Cambiar documento" : "Subir documento"}
    //         name="documento"
    //         type="file"
    //         accept=".pdf,.doc,.docx"
    //         onChange={manejarEntradas.handleInputChange}
    //       />
    //     </div>
    //   ),
    // },
  ];

  const paraNavegacion = {
    title: "Editar Producto",
    subTitle: "Actualice los datos del producto",
    icon: FaEdit,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        estilos: "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  };

  return (
    <EditEntity
      useEntityMutations={useProductMutations}
      useEntity={useProduct}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
