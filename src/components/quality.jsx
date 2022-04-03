import React from "react";

let Quality = ({ color, name, _id }) => {
    return (
            <span 
                key = {_id} 
                className = {`badge m-1 p-2 bg-${color}`}
            >
            {name}
            </span>
    )
};

export default Quality;