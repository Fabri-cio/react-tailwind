import {
  useProductMutations,
  useCategorias,
  useProveedores,
  useProduct,
} from "../../hooks/useEntities";
import { InputField } from "../../components/shared/InputField";
import { ToggleSwitch } from "../../components/shared/ToggleSwitch";
import { SelectField } from "../../components/shared/SelectField";
import ImagePreview from "../../components/shared/ImagePreview";
import { obtenerIdUser } from "../../utils/auth";
import {
  FaBackspace,
  FaEdit,
  FaEye,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";
import EditEntity from "../../components/shared/EditEntity";
import { useFormEntity } from "../../utils/useFormEntity";

export default function EditProduct() {
  const { paraSelectsdestructuringYMap } = useFormEntity();

  const logicaNegocio = {
    idUsuario: obtenerIdUser(),
  };

  const categoriasOptions = () =>
    paraSelectsdestructuringYMap(
      useCategorias,
      true,
      "id_categoria",
      "nombre_categoria"
    );

  const proveedoresOptions = () =>
    paraSelectsdestructuringYMap(
      useProveedores,
      true,
      "id_proveedor",
      "nombre_proveedor"
    );

  const selects = {
    categoriasOptions,
    proveedoresOptions,
  };

  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    precio: entidad?.data?.precio || "",
    codigo_barras: entidad?.data?.codigo_barras || "",
    id_proveedor: entidad?.data?.id_proveedor || "",
    categoria: entidad?.data?.categoria || "",
    estado: entidad?.data?.estado || false,
    imagen: entidad?.data?.imagen || null,
    documento: entidad?.data?.documento || null,
  });

  const camposExtras = (formValues) => ({
    id_proveedor: Number(formValues.id_proveedor),
    categoria: Number(formValues.categoria),
    precio: parseFloat(formValues.precio).toFixed(2),
    usuario_modificacion: logicaNegocio.idUsuario,
    imagen: formValues.imagen,
    documento: formValues.documento
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_producto,
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
          to: `/editCategory/${formValues.categoria}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addCategory",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/categoryList",
          icon: FaEye,
          estilos: "text-blue-600 hover:bg-blue-600 hover:text-white p-1",
        },
      ],
    },
    {
      component: SelectField,
      label: "Proveedor",
      name: "id_proveedor",
      onChange: manejarEntradas.handleInputChange,
      options: selects.proveedoresOptions(),
      actionButtons: [
        {
          to: `/editProveedor/${formValues.id_proveedor}`,
          icon: FaPencilAlt,
          estilos: "text-yellow-600 hover:bg-yellow-600 hover:text-white p-1",
        },
        {
          to: "/addProveedor",
          icon: FaPlus,
          estilos: "text-green-600 hover:bg-green-600 hover:text-white p-1",
        },
        {
          to: "/proveedorList",
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
    {
      name: 'documento',
      component: () => (
        <div className="space-y-2">
          {formValues.documento && (
            <div className="mb-2">
              <span className="block text-sm font-medium text-gray-700 mb-1">Documento actual:</span>
              <a 
                href={formValues.documento} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Ver documento actual
              </a>
            </div>
          )}
          <InputField
            label={formValues.documento ? "Cambiar documento" : "Subir documento"}
            name="documento"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={manejarEntradas.handleInputChange}
          />
        </div>
      ),
    },
  ];

  const paraNavegacion = {
    title: "Editar Producto",
    subTitle: "Actualice los datos del producto",
    icon: FaEdit,
    actions: [
      {
        to: -1,
        label: "Volver",
        icon: FaBackspace,
        estilos:
          "border-2 border-gray-400 text-gray-700 hover:text-white hover:bg-gray-700 p-1 gap-2",
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
