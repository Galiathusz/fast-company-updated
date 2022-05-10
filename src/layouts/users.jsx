import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import api from "../api";
import GroupList from "../components/groupList";
import SearchStatus from "../components/searchStatus";
import UserTable from "../components/usersTable";
import _ from "lodash";
import PropTypes from "prop-types";

const Users = () => {
    let [currentPage, setCurrentPage] = useState(1);
    let [professions, setProfession] = useState();
    let [selectedProf, setSelectedProf] = useState();
    let [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    let pageSize = 8;

    let [users, setUsers] = useState();
    let [data, setData] = useState("");

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    let handleDelete = (userId) => {
        setUsers((PrevState) =>
            PrevState.filter((user) => user._id !== userId)
        );
    };

    let handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

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

    let clearFilter = () => {
        setSelectedProf();
    };

    let handleSort = (item) => {
        setSortBy(item);
    };

    let handleChange = ({ target }) => {
        clearFilter();
        setData(target.value);
    };

    if (users) {
        let filteredUsers;
        if (!selectedProf) {
            filteredUsers = data ? users.filter(user => user.name.toLowerCase().indexOf(data.toLowerCase()) !== -1) : users;
        } else {
            data = "";
            filteredUsers = selectedProf ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf)) : users;
        };

        let count = filteredUsers.length;

        let sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

        let userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                    <form action="">
                        <div className="row mt-2">
                            <label htmlFor="search">
                                <input
                                    placeholder="Search..."
                                    type="text"
                                    id = "search"
                                    name = "search"
                                    value = {data}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </form>
                    {count !== 0 ? (
                        <UserTable
                            users = {userCrop}
                            onSort = {handleSort}
                            selectedSort = {sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
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
    }
    return (
        <h1>Loading</h1>
    );
};

Users.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};

export default Users;
