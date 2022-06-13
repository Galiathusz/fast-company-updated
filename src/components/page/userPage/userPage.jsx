import React, { useState, useEffect } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "./userCards/userCard";
import QualitiesCard from "./userCards/qualitiesCard";
import MeetingsCard from "./userCards/meetingsCard";
import CommentsList from "./comments/commentsList";

const UserPage = ({ match }) => {
    let userId = match.params.userId;

    let [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard
                                user = {user}
                                match = {match}
                            />
                            <QualitiesCard
                                user = {user}
                            />
                            <MeetingsCard
                                user = {user}
                            />
                        </div>
                        <div className = "col-md-8">
                            <CommentsList
                                user = {user}
                                match = {match}
                            />
                        </div>
                    </div>
                </div>
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
