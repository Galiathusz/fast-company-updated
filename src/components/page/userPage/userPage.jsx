import React, { useState, useEffect } from "react";
import api from "../../../api";
import Quality from "../../ui/qualities/quality";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserPage = ({ match }) => {
    let userId = match.params.userId;

    let [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

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
                <Link
                    key = {user._id}
                    to = {`/users/${userId}/edit`}
                >
                    <button>Изменить</button>
                </Link>
            </>
        );
    }
    return (
        <h1>Loading</h1>
    );
};

UserPage.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
};

export default UserPage;
