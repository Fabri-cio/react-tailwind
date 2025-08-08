import {
  useProveedorMutations,
  useProveedor,
} from "../../../hooks/useEntities";
import {
  InputField,
  ImagePreview,
  ToggleSwitch,
  EditEntity,
} from "../../../components/shared";
import { FaEdit } from "react-icons/fa";

export default function EditProveedor() {
  const configuracionFormulario = (entidad) => ({
    marca: entidad?.data?.marca || "",
    nombre_contacto: entidad?.data?.nombre_contacto || "",
    telefono: entidad?.data?.telefono || "",
    estado: entidad?.data?.estado || false,
    imagen: entidad?.data?.imagen || null,
    comentario_modificacion: entidad?.data?.comentario_modificacion || "",
  });

  const camposExtras = (formValues) => ({
    imagen: formValues.imagen,
    comentario_modificacion: formValues.comentario_modificacion,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id, // id_proveedor
    link: -1,
    params: camposExtras(formValues),
  });

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Marca",
      name: "marca",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Nombre de Contacto",
      name: "nombre_contacto",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Telefono",
      name: "telefono",
      required: false,
      onChange: manejarEntradas.handleInputChange,
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
    {
      component: InputField,
      label: "Comentario de Modificación",
      name: "comentario_modificacion",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
  ];

  const paraNavegacion = {
    title: "Editar Proveedor",
    subTitle: "Actualice los datos del proveedor",
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
      useEntityMutations={useProveedorMutations}
      useEntity={useProveedor}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
