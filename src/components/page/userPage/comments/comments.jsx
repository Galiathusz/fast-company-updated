import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const Comments = ({ comments, handleRemove }) => {
    return (
        <>
            {comments.map((comment) => (
                <Comment key = {comment._id} handleRemove = {handleRemove} {...comment}/>
            ))}
        </>
    );
};

Comments.propTypes = {
    comments: PropTypes.array,
    handleRemove: PropTypes.func
};

export default Comments;
