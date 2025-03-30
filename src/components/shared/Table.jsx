import Row from "./Row";

const Table = ({ items, fields, currentPage, itemsPerPage }) => {
  // Memoriza las cabeceras de la tabla
  const headers = fields.map((field) => (
    <th key={field.key} className="px-4 py-2 text-left text-sm">
      {field.label}
    </th>
  ));

  return (
    <table className="min-w-full table-auto border-2 border-gray-400 rounded-lg">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody className="border-t-2 border-gray-400">
        {items.map((item, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index;
          return (
            <Row
              key={item.id_producto || globalIndex}
              item={{ ...item, index: globalIndex }}
              fields={fields}
              index={globalIndex}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
