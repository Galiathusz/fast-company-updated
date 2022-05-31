import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    let handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({ ...selectedSort, order: selectedSort.order === "asc" ? "desc" : "asc" });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    let sortByPath = selectedSort.path;

    if (sortByPath === "profession.name") {
        sortByPath = "professions";
    };

    let sortByOrder = selectedSort.order;

    return (
        <thead>
            <tr>
                {Object.keys(columns).map(column => (
                    <th
                        key = {column}
                        onClick={ columns[column].path ? () => handleSort(columns[column].path) : undefined}
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                        className = {"" + (column === sortByPath ? "bi bi-caret-up-fill" : "") && (sortByOrder === "asc" ? "bi bi-caret-up-fill" : "bi bi-caret-down-fill")}
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
