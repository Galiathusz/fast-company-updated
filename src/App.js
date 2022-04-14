import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

function App() {
    let [users, setUsers] = useState();

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

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )};
        </>
    );
}

export default App;
