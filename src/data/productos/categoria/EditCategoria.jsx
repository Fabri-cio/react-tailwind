import { FaBackspace, FaEdit } from "react-icons/fa"
import { EditEntity, ToggleSwitch } from "../../../components/shared"
import { useCategoriaMutations } from "../../../hooks/useEntities"
import { useCategoria } from "../../../hooks/useEntities"
import { InputField } from "../../../components/shared/InputField"
import ImagePreview from "../../../components/shared/ImagePreview"

export default function EditCategoria() {
  const configFormulario = (entidad) => ({
    nombre_categoria: entidad?.data?.nombre_categoria || "",
    descripcion: entidad?.data?.descripcion || "",
    estado: entidad?.data?.estado || false,
  })

  const camposExtras = (formValues) => ({
    nombre_categoria: formValues.nombre_categoria,
    descripcion: formValues.descripcion,
    estado: formValues.estado,
  })

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_categoria,
    link: -1,
    params: camposExtras(formValues)
  })

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre_categoria",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      name: 'imagen',
      component: () => (
        <div className="space-y-2">
          <div className="font-medium text-gray-700">Imagen actual</div>
          <ImagePreview 
            image={formValues.imagen} 
            alt={`Imagen de ${formValues.nombre || 'categoria'}`}
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
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      onChange: manejarEntradas.handleToggleChange("estado"),
    }
  ]

  const paraNavegacion = {
    title: "Editar Categoría",
    subTitle: "Editar categoría",
    icon: FaEdit,
    actions: [
      {
        to: -1,
        label: "Cancelar",
        estilos: "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
      },
    ],
  }

  return (
    <EditEntity
      useEntityMutations={useCategoriaMutations}
      useEntity={useCategoria}
      configForm={configFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}