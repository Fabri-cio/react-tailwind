import { usePredicciones } from "../../../hooks/useEntities";
import { FaBox, FaEye } from "react-icons/fa";
import { EntityList } from "../../../components/shared";
import { ActionButton } from "../../../components/shared/ActionButton";
import { Link } from "react-router-dom";
import MiniGraficaPrediccion from "../../../components/shared/MiniGraficaPrediccion";

function Predicciones() {
  const prediccionFields = () => [
    { key: "index", label: "#" },
    {
      key: "actions",
      label: "Acciones",
      render: (item) => (
        <div className="flex gap-2">
          <ActionButton
            to={`/detalles-prediccion/${item.id}`}
            icon={FaEye}
            estilos="hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1"
          />
        </div>
      ),
    },
    {
      key: "fecha_inicio",
      label: "Fecha Inicio",
    },
    {
      key: "fecha_fin",
      label: "Fecha Fin",
    },
    { key: "resultado", label: "Resultado" },
    {
      key: "grafica",
      label: "Grafica",
      render: (item) => (
        <MiniGraficaPrediccion detalles={item.detalles || []} />
      ),
    },
    { key: "nombre_producto", label: "Producto" },
  ];

  const entityData = {
    title: <Link to="/predicciones">Predicciones</Link>,
    subTitle: "",
    loadingMessage: "Cargando predicciones...",
    errorMessage: "Error al obtener las predicciones",
    fetchDataHook: usePredicciones,
    itemKey: "id", //id_producto.  Es muy necesario para la tabla el itemKey
    entityFields: prediccionFields,
    icon: FaBox,
    // filtros: [
    //   {
    //     name: "search",
    //     placeholder: "Buscar por nombre, proveedor o categoría",
    //   },
    //   { name: "codigo_barras", placeholder: "Código de barras exacto" },
    //   { name: "precio_min", placeholder: "Precio mínimo" },
    //   { name: "precio_max", placeholder: "Precio máximo" },
    //   {
    //     name: "fecha_creacion_min",
    //     placeholder: "Desde fecha de creación",
    //     type: "date",
    //   },
    //   {
    //     name: "fecha_creacion_max",
    //     placeholder: "Hasta fecha de creación",
    //     type: "date",
    //   },
    // ],
    // ordenes: [
    //   { name: "nombre", label: "Nombre (A-Z)" },
    //   { name: "-nombre", label: "Nombre (Z-A)" },
    //   { name: "precio", label: "Precio ascendente" },
    //   { name: "-precio", label: "Precio descendente" },
    //   { name: "fecha_creacion", label: "Fecha más antigua" },
    //   { name: "-fecha_creacion", label: "Fecha más reciente" },
    // ],
  };
  return <EntityList entityData={entityData} />;
}

export default Predicciones;
