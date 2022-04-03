import React from "react";

let BookMark = ({ status }) => {

    return ( 
            status === false 
            ? <i className="bi bi-bookmark"></i> 
            : <i className="bi bi-bookmark-fill"></i>
    )
};

export default BookMark;