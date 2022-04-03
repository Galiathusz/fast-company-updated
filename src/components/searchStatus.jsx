import React, {useState} from "react";

let SearchStatus = ({ length }) => {
    
    let renderPhrase = (length) => {
        if(length === 0) {
            return <span className = "badge bg-danger">Никто с тобой не тусанет</span>
        } else if(length === 1) {
            return <span className = "badge bg-primary">1 человек тусанет с тобой сегодня</span>
        } else if(length > 1 && length < 5) {
            return <span className = "badge bg-primary">{length} человека тусанут с тобой сегодня</span>
        } else {
            return <span className = "badge bg-primary">{length} человек тусанут с тобой сегодня</span>
        }
    };

    return (
        <div>
            {renderPhrase(length)}
        </div>
    )
};

export default SearchStatus;