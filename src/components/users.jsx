import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import PropTypes from "prop-types";

const Users = ({ users, onDelete, onToggleBookMark }) => {
    let [currentPage, setCurrentPage] = useState(1);
    let [professions, setProfession] = useState();
    let [selectedProf, setSelectedProf] = useState();
    let pageSize = 2;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    let handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    let filteredUsers = selectedProf ? users.filter((user) => user.profession.name === selectedProf.name) : users;
    let count = filteredUsers.length;

    let userCrop = paginate(filteredUsers, currentPage, pageSize);

    let clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">

            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
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
                        </tbody>
                    </table>
                ) : (
                    ""
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default Users;
