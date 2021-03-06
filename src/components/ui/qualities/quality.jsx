import React from "react";
import PropTypes from "prop-types";

let Quality = ({ color, name, _id }) => {
    return (
        <span key={_id} className={`badge m-1 p-2 bg-${color}`}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Quality;
