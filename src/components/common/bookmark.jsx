import React from "react";
import PropTypes from "prop-types";

let BookMark = ({ status, onToggleBookMark, _id }) => {
    return (
        <button onClick={() => onToggleBookMark(_id)}>
            <i className={"bi bi-bookmark" + (status ? "-fill" : "")}> </i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
