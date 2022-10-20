import React from "react";

import { ITableProps } from "../types";

const Table: React.FC<ITableProps> = ({ cols, data }) => {
  return (
    <table className="min-w-full text-center">
      <thead className="border-b bg-gray-800">
        <tr>
          {cols?.map((name, index) => (
            <th
              key={index}
              scope="col"
              className="text-sm font-medium text-white px-6 py-4"
            >
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((record) => (
          <tr key={record._id} className="bg-white border-b">
            {Object.keys(record)?.map((r) => (
              <td
                key={r}
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {record[r]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
