import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookMark }) => {
    let count = users.length;
    let pageSize = 4;
    let [currentPage, setCurrentPage] = useState(1);
    let handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    let userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                onDelete={onDelete}
                                onToggleBookMark={onToggleBookMark}
                                {...user}
                            />
                        ))}
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </tbody>
                </table>
            ) : (
                ""
            )}
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default Users;
