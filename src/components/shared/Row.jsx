const Row = ({ item, fields, index }) => {
  return (
    <tr className="transition-colors duration-200 hover:bg-gray-50 group">
      {fields.map((field, idx) => (
        <td
          key={`${item.id || idx}-${field.key}`}
          className={`px-6 py-4 whitespace-nowrap text-sm ${
            field.key === 'acciones' ? 'text-right' : 'text-gray-700'
          }`}
        >
          <div className="flex items-center">
            {field.key === "index" ? (
              <span className="text-gray-500 font-medium">{index + 1}</span>
            ) : field.render ? (
              field.render(item)
            ) : (
              <span className="text-gray-900">
                {item[field.key] || '-'}
              </span>
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

export default Row;
