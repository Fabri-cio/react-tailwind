import React from "react";
import Row from "./Row";

const Table = ({ items, fields, currentPage, itemsPerPage, itemKey = "id", footer }) => {
  const headers = fields.map((field) => (
    <th
      key={field.key}
      className="px-1.5 sm:px-2 py-1 text-left text-[11px] font-medium uppercase tracking-wide text-gray-500 hidden md:table-cell"
    >
      {field.label}
    </th>
  ));

  return (
    <div className="overflow-hidden shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-[12px]">
          <thead className="bg-gray-50 top-0 z-10">
            <tr>{headers}</tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {items.map((item, index) => {
              const globalIndex =
                currentPage && itemsPerPage
                  ? (currentPage - 1) * itemsPerPage + index
                  : index;
              const key = item[itemKey] ?? globalIndex;
              return (
                <Row
                  key={key}
                  item={{ ...item, index: globalIndex }}
                  fields={fields}
                  index={globalIndex}
                />
              );
            })}
          </tbody>
          {footer && (
            <tfoot className="bg-gray-50 hidden md:table-footer-group text-[12px]">
              {footer}
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;
