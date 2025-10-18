import { useConfiguracionesModelos } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit, FaTrash } from "react-icons/fa";
import { EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";
import { StatusBadge } from "../../../components/shared";

function ConfiguracionesModelos() {
  const campos = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editConfiguracionModelo/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
    {
      key: "nombre",
      label: "Nombre",
    },
    {
      key: "crecimiento",
      label: "Crecimiento",
    },
    {
      key: "dataset",
      label: "Datos",
    },
    {
      key: "modo_est",
      label: "Estacionalidad",
    },
    {
      key: "frecuencia",
      label: "Frecuencia",
    },
    {
      key: "int_confianza",
      label: "Confianza",
    },
  ];

  const entityData = {
    title: <Link to="/configuracionesModelos">Configuraciones de Modelos</Link>,
    subTitle: "",
    loadingMessage: "Cargando configuraciones de modelos...",
    errorMessage: "Error al obtener las configuraciones de modelos",
    fetchDataHook: useConfiguracionesModelos,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: campos,
    actions: [
      {
        to: "/createConfiguracionModelo",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
    filtros: [],
    ordenes: [],
  };
  return <EntityList entityData={entityData} />;
}

export default ConfiguracionesModelos;
