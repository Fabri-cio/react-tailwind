import Row from "./Row";

const Table = ({ items, fields }) => {
  // Memoriza las cabeceras de la tabla
  const headers = fields.map((field) => (
    <th key={field.key} className="px-4 py-2 text-left">
      {field.label}
    </th>
  ));

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <Row
            key={item.id_producto || index}
            item={item}
            fields={fields}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
