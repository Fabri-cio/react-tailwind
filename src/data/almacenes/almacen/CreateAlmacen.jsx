import { obtenerIdUser } from "../../../utils/auth";
import { CreateEntity } from "../../../components/shared";
import { useAlmacenMutations } from "../../../hooks/useEntities";
import { InputField, ToggleSwitch } from "../../../components/shared";
import { FaPlus } from "react-icons/fa";

export default function CreateAlmacen() {
  const usuarioCreacion = { idUsuario: obtenerIdUser() };

  const estadoInicial = {
    nombre: "",
    direccion: "",
    telefono: "",
    es_principal: false,
    estado: false,
  };

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    direccion: formValues.direccion,
    telefono: formValues.telefono,
    es_principal: formValues.es_principal,
    estado: formValues.estado,
    usuario_creacion: usuarioCreacion.idUsuario,
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
        label: "Dirección",
        name: "direccion",
        required: true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: InputField,
        label: "Teléfono",
        name: "telefono",
        required: true,
        onChange: manejarEntradas.handleInputChange,
    },
    {
        component: ToggleSwitch,
        label: "Es principal",
        name: "es_principal",
        checked: formValues.es_principal,
        onChange: manejarEntradas.handleToggleChange("es_principal"),
    },
    {
        component: ToggleSwitch,
        label: "Estado",
        name: "estado",
        checked: formValues.estado,
        onChange: manejarEntradas.handleToggleChange("estado"),
    },
  ]

  const paraNavegacion = {
    title: "Agregar Almacén",
    subTitle: "Ingrese los datos del almacén",
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
      useEntityMutations={useAlmacenMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
