import React, { useState, useEffect } from "react";
import api from "../api";
import Quality from "./quality";
import PropTypes from "prop-types";

const UserPage = ({ match, history }) => {
    let userId = match.params.userId;

    let [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    let handleToAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h3>{user.qualities.map((quality) => (
                    <Quality key={quality._id} {...quality} />
                ))}</h3>
                <h3>completedMeetings: {user.completedMeetings}</h3>
                <h2>Rate: {user.rate}</h2>
                <button onClick={() => { handleToAllUsers(); }}>Все пользователи</button>
            </>
        );
    }
    return (
        <h1>Loading</h1>
    );
};

UserPage.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default UserPage;
