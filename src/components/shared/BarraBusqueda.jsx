function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500 text-sm"
      />
    </div>
  );
}

export default SearchBar;
