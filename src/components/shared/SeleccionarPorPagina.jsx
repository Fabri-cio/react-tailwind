export const SeleccionarPorPagina = ({
  perPage,
  setQueryParams,
  allData,
  search,
  ordering,
  filters,
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
      setQueryParams({
        all_data: true,
        search,
        ordering,
        ...filters,
      });
    } else {
      setQueryParams({
        all_data: false,
        per_page: parseInt(value),
        search,
        ordering,
        ...filters,
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="perPage">Mostrar</label>
      <select
        name="perPage"
        value={allData ? "Todos" : perPage}
        onChange={handleChange}
        className="w-20 p-2 text-sm border border-gray-300 rounded"
      >
        {opciones.map(({ id, nombre }) => (
          <option key={id} value={id}>
            {nombre}
          </option>
        ))}
      </select>
    </div>
  );
};
