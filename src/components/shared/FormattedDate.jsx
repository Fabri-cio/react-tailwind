const FormattedDate = ({
  date,
  format = "DD/MMM/YYYY",
  showWeekday = false,
}) => {
  if (!date) return "No registrado";

  const fecha = new Date(date);
  const dia = fecha.getDate().toString().padStart(2, "0"); // Asegura dos dígitos
  const mes = fecha.toLocaleString("es-ES", { month: "long" }).toLowerCase(); // Mes en texto
  const año = fecha.getFullYear();
  const diaSemana = fecha.toLocaleDateString("es-ES", { weekday: "long" }); // Día de la semana

  let formattedDate = "";

  if (format === "DD/MMM/YYYY") {
    formattedDate = `${dia} ${mes} ${año}`;
  } else if (format === "YYYY-MM-DD") {
    formattedDate = `${año}-${(fecha.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dia}`;
  } else {
    formattedDate = fecha.toLocaleDateString(); // Formato por defecto del navegador
  }

  if (showWeekday) {
    return `${diaSemana}, ${formattedDate}`;
  }

  return formattedDate;
};

export default FormattedDate;
