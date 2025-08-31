import React from "react";

const Row = React.memo(({ item, fields, index }) => {
  return (
    <>
      {/* Desktop / Tablet */}
      <tr className="hidden md:table-row hover:bg-gray-50 transition-colors">
        {fields.map((field, idx) => (
          <td
            key={`${item.id || idx}-${field.key}`}
            className={`px-1.5 sm:px-2 py-1 whitespace-nowrap text-[12px] ${
              field.key === "acciones" ? "text-right" : "text-gray-700"
            }`}
          >
            <div
              className={`flex items-center gap-1 ${
                field.align === "center" ? "justify-center" : ""
              } ${field.align === "right" ? "justify-end" : ""}`}
            >
              {field.key === "index"
                ? index + 1
                : field.render
                ? field.render(item, index)
                : item[field.key] || "-"}
            </div>
          </td>
        ))}
      </tr>

      {/* Mobile / Small */}
      <tr className="md:hidden block mb-1 border-b border-gray-200">
        <td colSpan={fields.length}>
          <div className="flex flex-col bg-white p-2 rounded shadow-sm space-y-1 hover:bg-gray-50 transition-colors cursor-pointer">
            {fields.map((field, idx) => (
              <div
                key={`${item.id || idx}-${field.key}`}
                className="flex justify-between"
              >
                <span className="font-medium text-gray-500 text-[11px]">
                  {field.label}:
                </span>
                <span className="text-gray-900 text-[12px] truncate">
                  {field.key === "index"
                    ? index + 1
                    : field.render
                    ? field.render(item, index)
                    : item[field.key] || "-"}
                </span>
              </div>
            ))}
          </div>
        </td>
      </tr>
    </>
  );
});

export default Row;
