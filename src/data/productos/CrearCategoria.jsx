import { FaPlus } from "react-icons/fa"
import CreateEntity from "../../components/shared/CreateEntity"
import { InputField } from "../../components/shared/InputField"
import { useCategoriaMutations } from "../../hooks/useEntities"
import { FaBackspace } from "react-icons/fa"

export default function CrearCategoria() {
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
            label: "Volver",
            icon: FaBackspace,
            estilos:
              "border-2 border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white p-2 rounded-lg",
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