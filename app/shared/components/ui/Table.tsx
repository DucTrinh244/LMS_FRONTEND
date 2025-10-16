// components/Table.tsx
import { type FC, type JSX } from "react";

interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => JSX.Element;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
}

const Table: FC<TableProps<any>> = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="border border-gray-200 p-3 text-left text-sm font-semibold text-gray-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="border border-gray-200 p-3 text-sm text-gray-600"
                >
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;