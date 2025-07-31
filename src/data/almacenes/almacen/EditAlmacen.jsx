import { InputField, ToggleSwitch } from "../../../components/shared";
import { useAlmacenMutations, useAlmacen } from "../../../hooks/useEntities";
import EditEntity from "../../../components/shared/EditEntity";
import { FaEdit } from "react-icons/fa";


export default function EditAlmacen() {
  const configuracionFormulario = (entidad) => ({
    nombre: entidad?.data?.nombre || "",
    direccion: entidad?.data?.direccion || "",
    telefono: entidad?.data?.telefono || "",
    es_principal: entidad?.data?.es_principal || false,
    estado: entidad?.data?.estado || false,
  });

  const camposExtras = (formValues) => ({
    nombre: formValues.nombre,
    direccion: formValues.direccion,
    telefono: formValues.telefono,
    es_principal: formValues.es_principal,
    estado: formValues.estado,
  });

  const paraEnvio = (formValues) => ({
    entityId: formValues.id_almacen_tienda,
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
  ];

  const paraNavegacion = {
    title: "Editar Almacén",
    subTitle: "Actualice los datos del almacén",
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
      useEntityMutations={useAlmacenMutations}
      useEntity={useAlmacen}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
