import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
    let columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link
                    key = {user._id}
                    to = {`users/${user._id}`}
                >
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => (
                <Qualities
                    qualities={user.qualities}
                />
            )
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    _id = {user._id}
                    onToggleBookMark = {onToggleBookMark}
                />)
        },
        delete: {
            component: (user) => (
                <button
                    className="btn bg-danger text-light"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort = {onSort}
            selectedSort = {selectedSort}
            columns = {columns}
            data = {users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
