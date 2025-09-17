import React from "react";
import {
  InputField,
  SelectField,
  ToggleSwitch,
  CamposListas,
  EditEntity,
} from "../../../components/shared";
import {
  useConfiguracionModelo,
  useConfiguracionModeloMutations,
} from "../../../hooks/useEntities";
import { FaPlus } from "react-icons/fa";

export default function CreateConfiguracionModelo() {
  const modoCrecimientoOptions = [
    { id: "linear", nombre: "Linear" },
    { id: "logistic", nombre: "Logistic" },
  ];

  const estacionalidadModoOptions = [
    { id: "additive", nombre: "Aditiva" },
    { id: "multiplicative", nombre: "Multiplicativa" },
  ];

  const frecuenciaDatosOptions = [
    { id: "D", nombre: "Diaria" },
    { id: "W", nombre: "Semanal" },
    { id: "M", nombre: "Mensual" },
  ];

  const tipoDatasetOptions = [
    { id: "normal", nombre: "Normal" },
    { id: "pocos", nombre: "Pocos Datos" },
    { id: "muchos", nombre: "Muchos Datos" },
    { id: "ruidosos", nombre: "Datos Ruidosos" },
    { id: "huecos", nombre: "Datos con Huecos" },
  ];

  // Estado inicial del formulario
  const configuracionFormulario = (entidad) => {
    const formValues = {
      //nombre
      nombre: entidad?.data?.nombre || "",
      //tipo dataset
      dataset: entidad?.data?.dataset || "normal",
      //crecimiento y saturación
      crecimiento: entidad?.data?.crecimiento || "linear",
      cap_max: entidad?.data?.cap_max || "",
      cap_min: entidad?.data?.cap_min || "",
      //intervalos
      int_confianza: entidad?.data?.int_confianza || "0.80",
      //estacionalidades estandar
      est_anual: entidad?.data?.est_anual ?? true,
      fourier_anual: entidad?.data?.fourier_anual || 10,
      est_semanal: entidad?.data?.est_semanal ?? true,
      fourier_semanal: entidad?.data?.fourier_semanal || 3,
      est_diaria: entidad?.data?.est_diaria ?? false,
      fourier_diaria: entidad?.data?.fourier_diaria || null,
      //modo estacionalidad
      modo_est: entidad?.data?.modo_est || "additive",
      //prior scales
      scale_est: entidad?.data?.scale_est || 10.0,
      scale_feriados: entidad?.data?.scale_feriados || 10.0,
      scale_cambio: entidad?.data?.scale_cambio || 0.05,
      //puntos de cambio
      n_cambios: entidad?.data?.n_cambios || 25,
      cambios: entidad?.data?.cambios || [],
      //feriados y eventos especiales
      usar_feriados: entidad?.data?.usar_feriados ?? false,
      eventos: entidad?.data?.eventos || [],
      estacionalidades_extra:
        entidad?.data?.estacionalidades_extra || [],
      //regresores adicionales
      regresores: entidad?.data?.regresores || [],
      //incertidumbre
      inc_tendencia:
        entidad?.data?.inc_tendencia ?? true,
      inc_estacionalidad:
        entidad?.data?.inc_estacionalidad ?? true,
      //frecuencia de datos
      frecuencia: entidad?.data?.frecuencia || "D",
      //descripcion
      descripcion: entidad?.data?.descripcion || "",
      //estado
      estado: entidad?.data?.estado ?? true,
    };

    console.log("FormValues:", formValues); // <--- aquí

    return formValues;
  };

  const camposExtras = (formValues) => {
    const extras = {
      nombre: formValues.nombre,
      dataset: formValues.dataset,
      crecimiento: formValues.crecimiento,
      cap_max: formValues.cap_max,
      cap_min: formValues.cap_min,
      int_confianza: formValues.int_confianza,
      est_anual: formValues.est_anual,
      fourier_anual: formValues.fourier_anual,
      est_semanal: formValues.est_semanal,
      fourier_semanal: formValues.fourier_semanal,
      est_diaria: formValues.est_diaria,
      fourier_diaria: formValues.fourier_diaria,
      modo_est: formValues.modo_est,
      scale_est: formValues.scale_est,
      scale_feriados: formValues.scale_feriados,
      scale_cambio: formValues.scale_cambio,
      n_cambios: formValues.n_cambios,
      usar_feriados: formValues.usar_feriados,
      cambios: formValues.cambios,
      eventos: formValues.eventos.map(
        ({ _internalId, ...rest }) => rest
      ),
      estacionalidades_extra:
        formValues.estacionalidades_extra.map(
          ({ _internalId, ...rest }) => rest
        ),
      regresores: formValues.regresores.map(
        ({ _internalId, ...rest }) => rest
      ),
      inc_tendencia:
        formValues.inc_tendencia,
      inc_estacionalidad:
        formValues.inc_estacionalidad,
      frecuencia: formValues.frecuencia,
      //descripcion
      descripcion: formValues.descripcion,
      //estado
      estado: formValues.estado,
    };

    console.log("Campos extras:", extras); // <--- aquí

    return extras;
  };

  const paraEnvio = (formValues) => {
    const envio = {
      entityId: formValues.id,
      link: -1,
      params: camposExtras(formValues),
    };

    console.log("Objeto para enviar al backend:", envio); // <--- aquí

    return envio;
  };

  const construirCampos = (formValues, manejarEntradas) => [
    // =======================
    // Sección: Datos básicos
    // =======================
    {
      component: InputField,
      label: "Nombre",
      placeholder: "Ingrese el nombre",
      name: "nombre",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =======================
    // Sección: Tipo de Dataset
    // =======================
    {
      component: SelectField,
      label: "Tipo de Dataset",
      name: "dataset",
      options: tipoDatasetOptions,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =======================
    // Sección: Crecimiento y saturación
    // =======================
    {
      component: SelectField,
      label: "Modo de Crecimiento",
      name: "crecimiento",
      options: modoCrecimientoOptions,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Capacidad Máxima",
      name: "cap_max",
      type: "float",
      placeholder: "Ingrese la capacidad máxima",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Capacidad Mínima",
      name: "cap_min",
      type: "float",
      placeholder: "Ingrese la capacidad mínima",
      required: formValues.crecimiento === "logistic",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Intervalo de Confianza",
      name: "int_confianza",
      type: "float",
      placeholder: "Ingrese el intervalo de confianza",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =========================
    // Sección: Estacionalidades
    // =========================
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Anual",
      name: "est_anual",
      checked: formValues.est_anual,
      required: false,
      onChange: manejarEntradas.handleToggleChange("est_anual"),
    },
    {
      component: InputField,
      label: "Fourier Anual",
      name: "fourier_anual",
      type: "number",
      placeholder: "Ingrese el fourier anual",
      required: true,
      value: formValues.fourier_anual,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_anual,
    },
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Semanal",
      name: "est_semanal",
      checked: formValues.est_semanal,
      required: false,
      onChange: manejarEntradas.handleToggleChange("est_semanal"),
    },
    {
      component: InputField,
      label: "Fourier Semanal",
      name: "fourier_semanal",
      type: "number",
      placeholder: "Ingrese el fourier semanal",
      required: true,
      value: formValues.fourier_semanal,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_semanal,
    },
    {
      component: ToggleSwitch,
      label: "Usar estacionalidad Diaria",
      name: "est_diaria",
      checked: formValues.est_diaria,
      required: false,
      onChange: manejarEntradas.handleToggleChange("est_diaria"),
    },
    {
      component: InputField,
      label: "Fourier Diaria",
      name: "fourier_diaria",
      type: "number",
      placeholder: "Ingrese el fourier diaria",
      required: true,
      value: formValues.fourier_diaria,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_diaria,
    },
    {
      component: SelectField,
      label: "Estacionalidad",
      name: "modo_est",
      options: estacionalidadModoOptions,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =========================
    // Sección: Prior scales
    // =========================
    {
      component: InputField,
      label: "Escala de Prioridad de Estacionalidad",
      name: "scale_est",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de estacionalidad",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Días Festivos",
      name: "scale_feriados",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de días festivos",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Puntos de Cambio",
      name: "scale_cambio",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de puntos de cambio",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =========================
    // Sección: Puntos de cambio
    // =========================
    {
      component: InputField,
      label: "N° de Puntos de Cambio",
      name: "n_cambios",
      type: "number",
      placeholder: "Ingrese el número de puntos de cambio",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },

    //json cambiar
    {
      component: CamposListas,
      label: "Puntos de Cambio",
      name: "cambios",
      value: formValues.cambios,
      onChange: manejarEntradas.handleInputChange,
    },

    // ======================================
    // Sección: Feriados y eventos especiales
    // ======================================
    {
      component: ToggleSwitch,
      label: "Usar Feriados",
      name: "usar_feriados",
      checked: formValues.usar_feriados,
      required: false,
      onChange: manejarEntradas.handleToggleChange("usar_feriados"),
    },
    {
      component: CamposListas,
      label: "Eventos Especiales",
      name: "eventos",
      value: formValues.eventos,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    {
      component: CamposListas,
      label: "Estacionalidades Personalizadas",
      name: "estacionalidades_extra",
      value: formValues.estacionalidades_extra,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    {
      component: CamposListas,
      label: "Regresores Adicionales",
      name: "regresores",
      value: formValues.regresores,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    // ======================================
    // Sección: Incertidumbre
    // ======================================
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre tendencia",
      name: "inc_tendencia",
      checked: formValues.inc_tendencia,
      required: false,
      onChange: manejarEntradas.handleToggleChange(
        "inc_tendencia"
      ),
    },
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre estacionalidad",
      name: "inc_estacionalidad",
      checked: formValues.inc_estacionalidad,
      required: false,
      onChange: manejarEntradas.handleToggleChange(
        "inc_estacionalidad"
      ),
    },
    // ======================================
    // Sección: Frecuencia de datos
    // ======================================
    {
      component: SelectField,
      label: "Frecuencia de datos",
      name: "frecuencia",
      options: frecuenciaDatosOptions,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // ======================================
    // Sección: Descripcion y estado
    // ======================================
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      type: "text",
      onChange: manejarEntradas.handleInputChange,
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
    title: "Registrar Configuración de Modelo",
    subTitle: "",
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
    <EditEntity
      useEntityMutations={useConfiguracionModeloMutations}
      useEntity={useConfiguracionModelo}
      configForm={configuracionFormulario}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
