import React from "react";

const raiseSort = (path, sortColumn, onSort) => {
  if (sortColumn.path === path) {
    sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
  } else {
    sortColumn.path = path;
    sortColumn.order = "asc";
  }
  onSort(sortColumn);
};

const renderSortIcon = (column, sortColumn) => {
  if (column.path !== sortColumn.path) {
    return null;
  }
  if (sortColumn.order === "asc") {
    return <i className="fa fa-sort-asc" />;
  }
  return <i className="fa fa-sort-desc" />;
};

const TableHeader = props => {
  const { sortColumn, columns, onSort } = props;
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className="clickable"
            key={column.path || column.key}
            onClick={() => raiseSort(column.path, sortColumn, onSort)}
            scope="col"
          >
            {column.label} {renderSortIcon(column, sortColumn)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
