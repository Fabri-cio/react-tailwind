import { useCategoriasList } from "../../../hooks/useEntities";
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
            title="Editar"
            estilos="hover:bg-blue-600 hover:text-white text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "image_url",
      label: "Imagen",
      render: (item) => (
        <Link to={`/productos_por_categoria/${item.id}`}>
          <Image src={item.image_url} alt={item.nombre} />
        </Link>
      ),
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
  ];

  const entityData = {
    title: <Link to="/categorias">Catalogo de Categorias</Link>,
    subTitle: "",
    loadingMessage: "Cargando categorias...",
    errorMessage: "Error al obtener las categorias",
    fetchDataHook: useCategoriasList,
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
    ordenes: [
      { name: "nombre", label: "Nombre (A-Z)" },
      { name: "-nombre", label: "Nombre (Z-A)" },
    ],
  };
  return <EntityList entityData={entityData} />;
}

export default Categorias;
