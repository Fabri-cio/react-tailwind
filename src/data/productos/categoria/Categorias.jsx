import { useCategorias } from "../../../hooks/useEntities";
import { FaPlus, FaBox, FaEdit } from "react-icons/fa";
import { StatusBadge, EntityList, Image } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";

function Categorias() {
  const productFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/editCategoria/${item.id}`}
            icon={FaEdit}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "imagen",
      label: "Imagen",
      render: (item) => <Image src={item.imagen} alt={item.nombre} />,
    },
    {
      key: "nombre",
      label: "Nombre",
    },
    {
      key: "estado",
      label: "Estado",
      render: (item) => <StatusBadge isActive={item.estado} />,
    },
    {
      key: "descripcion",
      label: "Descripción",
    },
  ];

  const entityData = {
    title: <Link to="/categorias">Catalogo de Categorias</Link>,
    subTitle: "",
    loadingMessage: "Cargando categorias...",
    errorMessage: "Error al obtener las categorias",
    fetchDataHook: useCategorias,
    itemKey: "id", //id_categoria.  Es muy necesario para la tabla el itemKey
    entityFields: productFields,
    actions: [
      {
        to: "/createCategoria",
        icon: FaPlus,
        estilos: "text-white bg-green-600 rounded-full p-2",
      },
    ],
    icon: FaBox,
  };
  return <EntityList entityData={entityData} />;
}

export default Categorias;
