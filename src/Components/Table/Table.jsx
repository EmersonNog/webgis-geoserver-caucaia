import React from "react";

const Table = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
  handleRowClick,
}) => (
  <table {...getTableProps()}>
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
              <span>
                {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
              </span>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            className={row.isSelected ? "selected" : ""}
            onClick={() => handleRowClick(row.id)}
          >
            {row.cells.map((cell) => (
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default Table;
