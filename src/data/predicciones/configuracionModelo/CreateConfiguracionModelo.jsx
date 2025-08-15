import React from "react";
import {
  InputField,
  SelectField,
  CreateEntity,
  ToggleSwitch,
  CamposListas,
} from "../../../components/shared";
import { useConfiguracionModeloMutations } from "../../../hooks/useEntities";
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
  const estadoInicial = {
    nombre_config: "",
    tipo_dataset: "normal",
    modo_crecimiento: "linear",
    capacidad_maxima: "",
    capacidad_minima: "",
    intervalo_confianza: "0.80",
    usar_est_anual: true,
    fourier_anual: 10,
    usar_est_semanal: true,
    fourier_semanal: 3,
    usar_est_diaria: false,
    fourier_diaria: null, // <-- cambiar a null
    estacionalidad_modo: "additive",
    seasonality_prior_scale: 10.0,
    holidays_prior_scale: 10.0,
    changepoint_prior_scale: 0.05,
    n_changepoints: 25,
    changepoints: [],
    usar_feriados: false,
    eventos_especiales: [],
    estacionalidades_personalizadas: [],
    regresores_adicionales: [],
    incluir_incertidumbre_tendencia: true,
    incluir_incertidumbre_estacionalidad: true,
    frecuencia_datos: "D",
    descripcion: "",
    estado: true,
  };

  const camposExtras = (formValues) => ({
    capacidad_maxima:
      formValues.modo_crecimiento === "logistic" &&
      formValues.capacidad_maxima !== ""
        ? parseFloat(formValues.capacidad_maxima)
        : null,
    capacidad_minima:
      formValues.capacidad_minima !== ""
        ? parseFloat(formValues.capacidad_minima)
        : null,
    intervalo_confianza:
      formValues.intervalo_confianza !== ""
        ? parseFloat(formValues.intervalo_confianza)
        : 0.8,

    usar_est_anual: formValues.usar_est_anual,
    fourier_anual: formValues.usar_est_anual
      ? parseInt(formValues.fourier_anual)
      : null,

    usar_est_semanal: formValues.usar_est_semanal,
    fourier_semanal: formValues.usar_est_semanal
      ? parseInt(formValues.fourier_semanal)
      : null,

    usar_est_diaria: formValues.usar_est_diaria,
    fourier_diaria: formValues.usar_est_diaria
      ? parseInt(formValues.fourier_diaria)
      : null,

    estacionalidad_modo: formValues.estacionalidad_modo,

    seasonality_prior_scale:
      formValues.seasonality_prior_scale !== ""
        ? parseFloat(formValues.seasonality_prior_scale)
        : 10.0,
    holidays_prior_scale:
      formValues.holidays_prior_scale !== ""
        ? parseFloat(formValues.holidays_prior_scale)
        : 10.0,
    changepoint_prior_scale:
      formValues.changepoint_prior_scale !== ""
        ? parseFloat(formValues.changepoint_prior_scale)
        : 0.05,

    n_changepoints:
      formValues.n_changepoints !== ""
        ? parseInt(formValues.n_changepoints)
        : 25,

    changepoints: formValues.changepoints.map(({ ds }) => ds),

    usar_feriados: formValues.usar_feriados,
    eventos_especiales: formValues.usar_feriados
      ? formValues.eventos_especiales.map(({ _internalId, ...rest }) => rest)
      : [],
    estacionalidades_personalizadas: formValues.usar_feriados
      ? formValues.estacionalidades_personalizadas.map(
          ({ _internalId, ...rest }) => rest
        )
      : [],
    regresores_adicionales: formValues.usar_feriados
      ? formValues.regresores_adicionales.map(
          ({ _internalId, ...rest }) => rest
        )
      : [],

    incluir_incertidumbre_tendencia: formValues.incluir_incertidumbre_tendencia,
    incluir_incertidumbre_estacionalidad:
      formValues.incluir_incertidumbre_estacionalidad,

    frecuencia_datos: formValues.frecuencia_datos,
    descripcion: formValues.descripcion || null,
    estado: formValues.estado !== undefined ? formValues.estado : true,
  });

  const paraEnvio = (formValues) => ({
    link: -1,
    params: camposExtras(formValues),
  });

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
      value: formValues.capacidad_maxima,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.modo_crecimiento === "logistic",
    },
    {
      component: InputField,
      label: "Capacidad Mínima",
      name: "capacidad_minima",
      type: "float",
      placeholder: "Ingrese la capacidad mínima",
      required: true,
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
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      type: "text",
      required: false,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Estado",
      name: "estado",
      checked: formValues.estado,
      required: true,
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
    <CreateEntity
      useEntityMutations={useConfiguracionModeloMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
