import { FaBackspace, FaEdit } from "react-icons/fa"
import { EditEntity } from "../../components/shared"
import { useCategoriaMutations } from "../../hooks/useEntities"
import { useCategoria } from "../../hooks/useEntities"
import { InputField } from "../../components/shared/InputField"


export default function EditCategoria() {
    const configFormulario = (entidad) => ({
        nombre_categoria: entidad?.data?.nombre_categoria || "",
        descripcion: entidad?.data?.descripcion || "",
    })

    const camposExtras = (formValues) => ({
        nombre_categoria: formValues.nombre_categoria,
        descripcion: formValues.descripcion,
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
    ]

    const paraNavegacion = {
        title: "Editar Categoría",
        subTitle: "Editar categoría",
        icon: FaEdit,
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