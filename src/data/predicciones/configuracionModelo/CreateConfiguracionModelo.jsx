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
  const modoCrecimientoOptions = () => [
    { id: "linear", nombre: "Linear" },
    { id: "logistic", nombre: "Logistic" },
  ];

  const estacionalidadModoOptions = () => [
    { id: "additive", nombre: "Aditiva" },
    { id: "multiplicative", nombre: "Multiplicativa" },
  ];

  const frecuenciaDatosOptions = () => [
    { id: "D", nombre: "Diaria" },
    { id: "W", nombre: "Semanal" },
    { id: "M", nombre: "Mensual" },
  ];

  // Estado inicial del formulario
  const estadoInicial = {
    nombre_config: "",
    //crecimiento y saturación
    modo_crecimiento: "linear",
    capacidad_maxima: null,
    capacidad_minima: null,
    //intervalos
    intervalo_confianza: "0.80",
    //estacionalidades estandar
    usar_est_anual: true,
    fourier_anual: 10,
    usar_est_semanal: true,
    fourier_semanal: 3,
    usar_est_diaria: false,
    fourier_diaria: 0,
    //modo estacionalidad
    estacionalidad_modo: "additive",
    //prior scales
    seasonality_prior_scale: 10.0,
    holidays_prior_scale: 10.0,
    changepoint_prior_scale: 0.05,
    //puntos de cambio
    n_changepoints: 25,
    changepoints: [],
    //feriados y eventos especiales
    usar_feriados: false,
    eventos_especiales: [],
    estacionalidades_personalizadas: [],
    //regresores adicionales
    regresores_adicionales: [],
    //incertidumbre
    incluir_incertidumbre_tendencia: true,
    incluir_incertidumbre_estacionalidad: true,
    //frecuencia de datos
    frecuencia_datos: "D",
    //validacion cruzada
    usar_validacion_cruzada: false,
    horizonte_cv: 30,
    periodo_cv: 15,
  };

  const camposExtras = (formValues) => ({
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
    changepoints: formValues.changepoints,
    usar_feriados: formValues.usar_feriados,
    eventos_especiales: formValues.eventos_especiales,
    estacionalidades_personalizadas: formValues.estacionalidades_personalizadas,
    regresores_adicionales: formValues.regresores_adicionales,
    incluir_incertidumbre_tendencia: formValues.incluir_incertidumbre_tendencia,
    incluir_incertidumbre_estacionalidad:
      formValues.incluir_incertidumbre_estacionalidad,
    frecuencia_datos: formValues.frecuencia_datos,
    usar_validacion_cruzada: formValues.usar_validacion_cruzada,
    horizonte_cv: formValues.horizonte_cv,
    periodo_cv: formValues.periodo_cv,
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
    // Sección: Crecimiento y saturación
    // =======================
    {
      component: SelectField,
      label: "Modo de Crecimiento",
      name: "modo_crecimiento",
      options: modoCrecimientoOptions(),
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
      component: ({ value, ...props }) =>
        formValues.usar_est_anual ? (
          <InputField
            label="Fourier Anual"
            name="fourier_anual"
            type="number"
            placeholder="Ingrese el fourier anual"
            required={true}
            onChange={manejarEntradas.handleInputChange}
            {...props}
          />
        ) : null,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Semanal",
      name: "usar_est_semanal",
      checked: formValues.usar_est_semanal,
      required: true,
      onChange: manejarEntradas.handleToggleChange("usar_est_semanal"),
    },
    {
      component: ({ value, ...props }) =>
        formValues.usar_est_semanal ? (
          <InputField
            label="Fourier Semanal"
            name="fourier_semanal"
            type="number"
            placeholder="Ingrese el fourier semanal"
            required={true}
            onChange={manejarEntradas.handleInputChange}
            {...props}
          />
        ) : null,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Usar estacionalidad Diaria",
      name: "usar_est_diaria",
      checked: formValues.usar_est_diaria,
      required: true,
      onChange: manejarEntradas.handleToggleChange("usar_est_diaria"),
    },
    {
      component: ({ value, ...props }) =>
        formValues.usar_est_diaria ? (
          <InputField
            label="Fourier Diaria"
            name="fourier_diaria"
            type="number"
            placeholder="Ingrese el fourier diaria"
            required={false}
            onChange={manejarEntradas.handleInputChange}
            {...props}
          />
        ) : null,
    },
    {
      component: SelectField,
      label: "Estacionalidad",
      name: "estacionalidad_modo",
      options: estacionalidadModoOptions(),
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
      value: formValues.changepoints.map((d) => ({ ds: d })),
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
      required: true,
      onChange: manejarEntradas.handleToggleChange("usar_feriados"),
    },

    {
      component: ({ value, ...props }) =>
        formValues.usar_feriados ? (
          <CamposListas
            label="Eventos Especiales"
            name="eventos_especiales"
            value={formValues.eventos_especiales}
            onChange={manejarEntradas.handleInputChange}
          />
        ) : null,
    },
    {
      component: ({ value, ...props }) =>
        formValues.usar_feriados ? (
          <CamposListas
            label="Estacionalidades Personalizadas"
            name="estacionalidades_personalizadas"
            value={formValues.estacionalidades_personalizadas}
            onChange={manejarEntradas.handleInputChange}
          />
        ) : null,
    },
    {
      component: ({ value, ...props }) =>
        formValues.usar_feriados ? (
          <CamposListas
            label="Regresores Adicionales"
            name="regresores_adicionales"
            value={formValues.regresores_adicionales}
            onChange={manejarEntradas.handleInputChange}
          />
        ) : null,
    },
    // ======================================
    // Sección: Incertidumbre
    // ======================================
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre tendencia",
      name: "incluir_incertidumbre_tendencia",
      checked: formValues.incluir_incertidumbre_tendencia,
      required: true,
      onChange: manejarEntradas.handleToggleChange(
        "incluir_incertidumbre_tendencia"
      ),
    },
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre estacionalidad",
      name: "incluir_incertidumbre_estacionalidad",
      checked: formValues.incluir_incertidumbre_estacionalidad,
      required: true,
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
      options: frecuenciaDatosOptions(),
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    // ======================================
    // Sección: Validacion cruzada
    // ======================================
    {
      component: ToggleSwitch,
      label: "Validacion cruzada",
      name: "usar_validacion_cruzada",
      checked: formValues.usar_validacion_cruzada,
      required: true,
      onChange: manejarEntradas.handleToggleChange("usar_validacion_cruzada"),
    },
    {
      component: InputField,
      label: "Horizonte CV",
      name: "horizonte_cv",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Periodo CV",
      name: "periodo_cv",
      type: "number",
      required: true,
      onChange: manejarEntradas.handleInputChange,
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
