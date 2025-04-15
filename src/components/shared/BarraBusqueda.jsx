// components/shared/SearchBar.jsx
import { useState } from "react";

function BarraBusqueda({ onSearch, searchKeys = [], placeholder = "Buscar..." }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // se lo delegamos al componente padre
  };

  return (
    <div className="">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </div>
  );
}

export default BarraBusqueda;
