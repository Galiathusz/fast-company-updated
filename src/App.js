import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    let [users, setUsers] = useState(api.users.fetchAll());

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

    return (
        <>
            <h1>
                <SearchStatus length={users.length} />
            </h1>
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </>
    );
}

export default App;
