import { FaPlus } from "react-icons/fa"
import CreateEntity from "../../../components/shared/CreateEntity"
import { InputField } from "../../../components/shared/InputField"
import { useCategoriaMutations } from "../../../hooks/useEntities"

export default function CreateCategoria() {
    const configuracionFormulario = {
        nombre_categoria: "",
        descripcion: "",
    }

    const camposExtras = (formValues) => ({
        nombre_categoria: formValues.nombre_categoria,
        descripcion: formValues.descripcion,
    })

    const paraEnvio = (formValues) => ({
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
    ]
    
    const paraNavegacion = {
        title: "Crear Categoría",
        subTitle: "Crea una nueva categoría",
        icon: FaPlus,
        actions: [
          {
            to: -1,
            label: "Cancelar",
            estilos: "border-2 border-gray-700 rounded-lg bg-gray-600 text-white p-2 hover:bg-gray-100 hover:text-gray-600",
          },
        ],
      }
    
    return (
        <CreateEntity
          useEntityMutations={useCategoriaMutations}
          configForm={configuracionFormulario}
          paraEnvio={paraEnvio}
          construirCampos={construirCampos}
          paraNavegacion={paraNavegacion}
        />
      );
}