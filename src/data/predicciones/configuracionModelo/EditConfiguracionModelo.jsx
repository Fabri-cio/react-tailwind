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
    { id: "pocos_datos", nombre: "Pocos Datos" },
    { id: "muchos_datos", nombre: "Muchos Datos" },
    { id: "datos_ruidosos", nombre: "Datos Ruidosos" },
    { id: "datos_huecos", nombre: "Datos con Huecos" },
  ];

  // Estado inicial del formulario
  const configuracionFormulario = (entidad) => {
    const formValues = {
      //nombre
      nombre_config: entidad?.data?.nombre_config || "",
      //tipo dataset
      tipo_dataset: entidad?.data?.tipo_dataset || "normal",
      //crecimiento y saturación
      modo_crecimiento: entidad?.data?.modo_crecimiento || "linear",
      capacidad_maxima: entidad?.data?.capacidad_maxima || "",
      capacidad_minima: entidad?.data?.capacidad_minima || "",
      //intervalos
      intervalo_confianza: entidad?.data?.intervalo_confianza || "0.80",
      //estacionalidades estandar
      usar_est_anual: entidad?.data?.usar_est_anual ?? true,
      fourier_anual: entidad?.data?.fourier_anual || 10,
      usar_est_semanal: entidad?.data?.usar_est_semanal ?? true,
      fourier_semanal: entidad?.data?.fourier_semanal || 3,
      usar_est_diaria: entidad?.data?.usar_est_diaria ?? false,
      fourier_diaria: entidad?.data?.fourier_diaria || null,
      //modo estacionalidad
      estacionalidad_modo: entidad?.data?.estacionalidad_modo || "additive",
      //prior scales
      seasonality_prior_scale: entidad?.data?.seasonality_prior_scale || 10.0,
      holidays_prior_scale: entidad?.data?.holidays_prior_scale || 10.0,
      changepoint_prior_scale: entidad?.data?.changepoint_prior_scale || 0.05,
      //puntos de cambio
      n_changepoints: entidad?.data?.n_changepoints || 25,
      changepoints: entidad?.data?.changepoints || [],
      //feriados y eventos especiales
      usar_feriados: entidad?.data?.usar_feriados ?? false,
      eventos_especiales: entidad?.data?.eventos_especiales || [],
      estacionalidades_personalizadas:
        entidad?.data?.estacionalidades_personalizadas || [],
      //regresores adicionales
      regresores_adicionales: entidad?.data?.regresores_adicionales || [],
      //incertidumbre
      incluir_incertidumbre_tendencia:
        entidad?.data?.incluir_incertidumbre_tendencia ?? true,
      incluir_incertidumbre_estacionalidad:
        entidad?.data?.incluir_incertidumbre_estacionalidad ?? true,
      //frecuencia de datos
      frecuencia_datos: entidad?.data?.frecuencia_datos || "D",
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
      nombre_config: formValues.nombre_config,
      tipo_dataset: formValues.tipo_dataset,
      modo_crecimiento: formValues.modo_crecimiento,
      capacidad_maxima: formValues.capacidad_maxima,
      capacidad_minima: formValues.capacidad_minima,
      intervalo_confianza: formValues.intervalo_confianza,
      usar_est_anual: formValues.usar_est_anual,
      fourier_anual: formValues.fourier_anual,
      usar_est_semanal: formValues.usar_est_semanal,
      fourier_semanal: formValues.fourier_semanal,
      usar_est_diaria: formValues.usar_est_diaria,
      fourier_diaria: formValues.fourier_diaria,
      estacionalidad_modo: formValues.estacionalidad_modo,
      seasonality_prior_scale: formValues.seasonality_prior_scale,
      holidays_prior_scale: formValues.holidays_prior_scale,
      changepoint_prior_scale: formValues.changepoint_prior_scale,
      n_changepoints: formValues.n_changepoints,
      usar_feriados: formValues.usar_feriados,
      changepoints: formValues.changepoints,
      eventos_especiales: formValues.eventos_especiales.map(
        ({ _internalId, ...rest }) => rest
      ),
      estacionalidades_personalizadas:
        formValues.estacionalidades_personalizadas.map(
          ({ _internalId, ...rest }) => rest
        ),
      regresores_adicionales: formValues.regresores_adicionales.map(
        ({ _internalId, ...rest }) => rest
      ),
      incluir_incertidumbre_tendencia:
        formValues.incluir_incertidumbre_tendencia,
      incluir_incertidumbre_estacionalidad:
        formValues.incluir_incertidumbre_estacionalidad,
      frecuencia_datos: formValues.frecuencia_datos,
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
      name: "nombre_config",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // =======================
    // Sección: Tipo de Dataset
    // =======================
    {
      component: SelectField,
      label: "Tipo de Dataset",
      name: "tipo_dataset",
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
      name: "modo_crecimiento",
      options: modoCrecimientoOptions,
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Capacidad Máxima",
      name: "capacidad_maxima",
      type: "float",
      placeholder: "Ingrese la capacidad máxima",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Capacidad Mínima",
      name: "capacidad_minima",
      type: "float",
      placeholder: "Ingrese la capacidad mínima",
      required: formValues.modo_crecimiento === "logistic",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Intervalo de Confianza",
      name: "intervalo_confianza",
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
      name: "usar_est_anual",
      checked: formValues.usar_est_anual,
      required: false,
      onChange: manejarEntradas.handleToggleChange("usar_est_anual"),
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
      visible: formValues.usar_est_anual,
    },
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Semanal",
      name: "usar_est_semanal",
      checked: formValues.usar_est_semanal,
      required: false,
      onChange: manejarEntradas.handleToggleChange("usar_est_semanal"),
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
      visible: formValues.usar_est_semanal,
    },
    {
      component: ToggleSwitch,
      label: "Usar estacionalidad Diaria",
      name: "usar_est_diaria",
      checked: formValues.usar_est_diaria,
      required: false,
      onChange: manejarEntradas.handleToggleChange("usar_est_diaria"),
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
      visible: formValues.usar_est_diaria,
    },
    {
      component: SelectField,
      label: "Estacionalidad",
      name: "estacionalidad_modo",
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
      name: "seasonality_prior_scale",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de estacionalidad",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Días Festivos",
      name: "holidays_prior_scale",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de días festivos",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Puntos de Cambio",
      name: "changepoint_prior_scale",
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
      name: "n_changepoints",
      type: "number",
      placeholder: "Ingrese el número de puntos de cambio",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },

    //json cambiar
    {
      component: CamposListas,
      label: "Puntos de Cambio",
      name: "changepoints",
      value: formValues.changepoints,
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
      name: "eventos_especiales",
      value: formValues.eventos_especiales,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    {
      component: CamposListas,
      label: "Estacionalidades Personalizadas",
      name: "estacionalidades_personalizadas",
      value: formValues.estacionalidades_personalizadas,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    {
      component: CamposListas,
      label: "Regresores Adicionales",
      name: "regresores_adicionales",
      value: formValues.regresores_adicionales,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.usar_feriados,
    },
    // ======================================
    // Sección: Incertidumbre
    // ======================================
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre tendencia",
      name: "incluir_incertidumbre_tendencia",
      checked: formValues.incluir_incertidumbre_tendencia,
      required: false,
      onChange: manejarEntradas.handleToggleChange(
        "incluir_incertidumbre_tendencia"
      ),
    },
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre estacionalidad",
      name: "incluir_incertidumbre_estacionalidad",
      checked: formValues.incluir_incertidumbre_estacionalidad,
      required: false,
      onChange: manejarEntradas.handleToggleChange(
        "incluir_incertidumbre_estacionalidad"
      ),
    },
    // ======================================
    // Sección: Frecuencia de datos
    // ======================================
    {
      component: SelectField,
      label: "Frecuencia de datos",
      name: "frecuencia_datos",
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
