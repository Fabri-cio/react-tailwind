export const SeleccionarPorPagina = ({
  perPage,
  setPerPage,
  setAllData,
  setPage,
  allData,
}) => {
  const opciones = [
    { id: 3, nombre: "3" },
    { id: 5, nombre: "5" },
    { id: 10, nombre: "10" },
    { id: 20, nombre: "20" },
    { id: "Todos", nombre: "Todos" },
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "Todos") {
      setAllData(true);
    } else {
      setAllData(false);
      setPerPage(parseInt(value));
    }
    setPage(1);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="perPage">Mostrar</label>
      <select
        name="perPage"
        value={allData ? "Todos" : perPage}
        onChange={handleChange}
        className="w-20 p-2 text-sm border border-gray-300 rounded"
        required
      >
        <option value="" disabled>
          Selecciona una opción
        </option>
        {opciones.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </select>
    </div>
  );
};
