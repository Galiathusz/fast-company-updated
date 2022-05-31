import React from "react";
import UserPage from "../components/page/userPage";
import UsersPage from "../components/page/usersPage";
import PropTypes from "prop-types";

const UsersList = ({ match, history }) => {
    let userId = match.params.userId;
    return (
        <>
            { userId ? <UserPage match = {match} history = {history}/> : <UsersPage/>}
        </>
    );
};

UsersList.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default UsersList;
