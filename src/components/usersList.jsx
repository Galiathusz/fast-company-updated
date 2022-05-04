import React from "react";
import Users from "../layouts/users";
import UserPage from "./userPage";
import PropTypes from "prop-types";

const UsersList = ({ match, history }) => {
    let userId = match.params.userId;
    return (
        <>
            { userId ? <UserPage match = {match} history = {history}/> : <Users/>}
        </>
    );
};

UsersList.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default UsersList;
