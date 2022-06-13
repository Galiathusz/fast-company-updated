import React from "react";
import EditUserPageForm from "../../ui/editUserPageForm";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const EditUserPage = ({ match }) => {
    let userId = match.params.userId;
    return (
        <div className="container mt-5">
            <Link
                key = {userId}
                to={`/users/${userId}`}
            >
                <button className = "btn btn-primary">
                    &#8249; Назад
                </button>
            </Link>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <EditUserPageForm
                        userId = {userId}
                    />
                </div>
            </div>
        </div>
    );
};

EditUserPage.propTypes = {
    match: PropTypes.object
};

export default EditUserPage;
