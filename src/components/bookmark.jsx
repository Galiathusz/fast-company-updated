import React from "react";
import PropTypes from "prop-types";

let BookMark = ({ status }) => {
    return status === false ? (
        <i className="bi bi-bookmark"></i>
    ) : (
        <i className="bi bi-bookmark-fill"></i>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
