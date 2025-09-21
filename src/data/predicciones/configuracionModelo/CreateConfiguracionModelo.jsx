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
    { id: "pocos", nombre: "Pocos Datos" },
    { id: "muchos", nombre: "Muchos Datos" },
    { id: "ruidosos", nombre: "Datos Ruidosos" },
    { id: "huecos", nombre: "Datos con Huecos" },
  ];

  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    dataset: "normal",
    crecimiento: "linear",
    cap_max: "",
    cap_min: "",
    int_confianza: "0.80",
    est_anual: true,
    fourier_anual: 10,
    est_semanal: true,
    fourier_semanal: 3,
    est_diaria: false,
    fourier_diaria: null,
    modo_est: "additive",
    scale_est: 10.0,
    scale_feriados: 10.0,
    scale_cambio: 0.05,
    n_cambios: 25,
    cambios: [],
    usar_feriados: false,
    eventos: [],
    estacionalidades_extra: [],
    regresores: [],
    inc_tendencia: true,
    inc_estacionalidad: true,
    incertidumbre_muestras: 1000,
    frecuencia: "D",
    descripcion: "",
    estado: true,
  };

  const camposExtras = (formValues) => ({
    cap_max:
      formValues.crecimiento === "logistic" && formValues.cap_max !== ""
        ? parseFloat(formValues.cap_max)
        : null,
    cap_min: formValues.cap_min !== "" ? parseFloat(formValues.cap_min) : null,
    int_confianza:
      formValues.int_confianza !== ""
        ? parseFloat(formValues.int_confianza)
        : 0.8,

    est_anual: formValues.est_anual,
    fourier_anual: formValues.est_anual
      ? parseInt(formValues.fourier_anual)
      : null,

    est_semanal: formValues.est_semanal,
    fourier_semanal: formValues.est_semanal
      ? parseInt(formValues.fourier_semanal)
      : null,

    est_diaria: formValues.est_diaria,
    fourier_diaria: formValues.est_diaria
      ? parseInt(formValues.fourier_diaria)
      : null,

    modo_est: formValues.modo_est,

    scale_est:
      formValues.scale_est !== "" ? parseFloat(formValues.scale_est) : 10.0,
    scale_feriados:
      formValues.scale_feriados !== ""
        ? parseFloat(formValues.scale_feriados)
        : 10.0,
    scale_cambio:
      formValues.scale_cambio !== ""
        ? parseFloat(formValues.scale_cambio)
        : 0.05,

    n_cambios:
      formValues.n_cambios !== "" ? parseInt(formValues.n_cambios) : 25,

    cambios: formValues.cambios.map(({ ds }) => ds),

    usar_feriados: formValues.usar_feriados,
    eventos: formValues.usar_feriados
      ? formValues.eventos.map(({ _internalId, ...rest }) => rest)
      : [],
    estacionalidades_extra: formValues.usar_feriados
      ? formValues.estacionalidades_extra.map(
          ({ _internalId, ...rest }) => rest
        )
      : [],
    regresores: formValues.usar_feriados
      ? formValues.regresores.map(({ _internalId, ...rest }) => rest)
      : [],

    inc_tendencia: formValues.inc_tendencia,
    inc_estacionalidad: formValues.inc_estacionalidad,
    incertidumbre_muestras: formValues.incertidumbre_muestras,

    frecuencia: formValues.frecuencia,
    descripcion: formValues.descripcion || null,
    estado: formValues.estado !== undefined ? formValues.estado : true,
  });

  // 2️⃣ Función de validación antes de enviar el formulario
  const validarFormulario = (formValues) => {
    const errores = {};

    // Intervalo de confianza
    const intConf = parseFloat(formValues.int_confianza);
    if (intConf <= 0 || intConf > 1)
      errores.int_confianza = "Debe estar entre 0 y 1";

    // Crecimiento logístico
    if (formValues.crecimiento === "logistic") {
      if (!formValues.cap_max)
        errores.cap_max = "Requerido para crecimiento logístico";
      if (formValues.cap_min >= formValues.cap_max)
        errores.cap_min = "cap_min debe ser menor que cap_max";
    }

    // Fourier
    if (formValues.est_anual && formValues.fourier_anual <= 0)
      errores.fourier_anual = "Debe ser positivo";
    if (formValues.est_semanal && formValues.fourier_semanal <= 0)
      errores.fourier_semanal = "Debe ser positivo";
    if (
      formValues.est_diaria &&
      (!formValues.fourier_diaria || formValues.fourier_diaria <= 0)
    )
      errores.fourier_diaria = "Debe ser positivo";

    // Escalas y puntos de cambio
    if (formValues.scale_est <= 0) errores.scale_est = "Debe ser positivo";
    if (formValues.scale_cambio <= 0)
      errores.scale_cambio = "Debe ser positivo";
    if (formValues.n_cambios <= 0) errores.n_cambios = "Debe ser positivo";

    return errores;
  };

  const paraEnvio = (formValues) => {
    const errores = validarFormulario(formValues);
    if (Object.keys(errores).length > 0) {
      return { errores };
    } else {
      return {
        link: -1,
        params: camposExtras(formValues),
      };
    }
  };

  const construirCampos = (formValues, manejarEntradas) => [
    {
      component: InputField,
      label: "Nombre",
      name: "nombre",
      placeholder: "Ingrese el nombre",
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: SelectField,
      label: "Tipo de Dataset",
      name: "dataset",
      options: tipoDatasetOptions,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: SelectField,
      label: "Modo de Crecimiento",
      name: "crecimiento",
      options: modoCrecimientoOptions,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: InputField,
      label: "Capacidad Máxima",
      name: "cap_max",
      type: "float",
      placeholder: "Ingrese la capacidad máxima",
      value: formValues.cap_max,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.crecimiento === "logistic",
    },
    {
      component: InputField,
      label: "Capacidad Mínima",
      name: "cap_min",
      type: "float",
      placeholder: "Ingrese la capacidad mínima",
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Intervalo de Confianza",
      name: "int_confianza",
      type: "float",
      placeholder: "Ingrese el intervalo de confianza",
      value: formValues.int_confianza,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Anual",
      name: "est_anual",
      checked: formValues.est_anual,
      onChange: manejarEntradas.handleToggleChange("est_anual"),
    },
    {
      component: InputField,
      label: "Fourier Anual",
      name: "fourier_anual",
      type: "number",
      placeholder: "Ingrese el fourier anual",
      value: formValues.fourier_anual,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_anual,
    },
    {
      component: ToggleSwitch,
      label: "Usar Estacionalidad Semanal",
      name: "est_semanal",
      checked: formValues.est_semanal,
      onChange: manejarEntradas.handleToggleChange("est_semanal"),
    },
    {
      component: InputField,
      label: "Fourier Semanal",
      name: "fourier_semanal",
      type: "number",
      placeholder: "Ingrese el fourier semanal",
      value: formValues.fourier_semanal,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_semanal,
    },
    {
      component: ToggleSwitch,
      label: "Usar estacionalidad Diaria",
      name: "est_diaria",
      checked: formValues.est_diaria,
      onChange: manejarEntradas.handleToggleChange("est_diaria"),
    },
    {
      component: InputField,
      label: "Fourier Diaria",
      name: "fourier_diaria",
      type: "number",
      placeholder: "Ingrese el fourier diaria",
      value: formValues.fourier_diaria,
      onChange: manejarEntradas.handleInputChange,
      visible: formValues.est_diaria,
    },
    {
      component: SelectField,
      label: "Estacionalidad",
      name: "modo_est",
      options: estacionalidadModoOptions,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Estacionalidad",
      name: "scale_est",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de estacionalidad",
      value: formValues.scale_est,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Días Festivos",
      name: "scale_feriados",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de días festivos",
      value: formValues.scale_feriados,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "Escala de Prioridad de Puntos de Cambio",
      name: "scale_cambio",
      type: "float",
      placeholder: "Ingrese la escala de prioridad de puntos de cambio",
      value: formValues.scale_cambio,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: InputField,
      label: "N° de Puntos de Cambio",
      name: "n_cambios",
      type: "number",
      placeholder: "Ingrese el número de puntos de cambio",
      value: formValues.n_cambios,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: CamposListas,
      label: "Puntos de Cambio",
      name: "cambios",
      value: formValues.cambios,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: ToggleSwitch,
      label: "Usar Feriados",
      name: "usar_feriados",
      checked: formValues.usar_feriados,
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
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre tendencia",
      name: "inc_tendencia",
      checked: formValues.inc_tendencia,
      onChange: manejarEntradas.handleToggleChange("inc_tendencia"),
    },
    {
      component: ToggleSwitch,
      label: "Incluir incertidumbre estacionalidad",
      name: "inc_estacionalidad",
      checked: formValues.inc_estacionalidad,
      onChange: manejarEntradas.handleToggleChange("inc_estacionalidad"),
    },
    {
      component: InputField,
      label: "Número de muestras de incertidumbre",
      name: "incertidumbre_muestras",
      type: "number",
      placeholder: "Ingrese el número de muestras",
      value: formValues.incertidumbre_muestras,
      onChange: manejarEntradas.handleInputChange,
    },
    {
      component: SelectField,
      label: "Frecuencia de datos",
      name: "frecuencia",
      options: frecuenciaDatosOptions,
      onChange: manejarEntradas.handleInputChange,
      required: true,
    },
    {
      component: InputField,
      label: "Descripción",
      name: "descripcion",
      type: "text",
      value: formValues.descripcion,
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
    <CreateEntity
      useEntityMutations={useConfiguracionModeloMutations}
      configForm={estadoInicial}
      paraEnvio={paraEnvio}
      construirCampos={construirCampos}
      paraNavegacion={paraNavegacion}
    />
  );
}
