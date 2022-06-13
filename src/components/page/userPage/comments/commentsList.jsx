import React, { useEffect, useState } from "react";
import Comments from "./comments";
import commentsApi from "../../../../api/fake.api/comments.api";
import PropTypes from "prop-types";
import AddCommentForm from "./addCommentForm";

const CommentsList = ({ match }) => {
    let userId = match.params.userId;

    let [comments, setComments] = useState();

    useEffect(() => {
        commentsApi.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);

    let handleRemove = (id) => {
        commentsApi.remove(id).then((id) => {
            setComments(comments.filter((comment) => comment._id !== id));
        });
    };

    const handleSubmit = (data) => {
        commentsApi.add({ ...data, pageId: userId }).then((data) => {
            setComments([...comments, data]);
        });
    };

    if (comments && comments.length > 0) {
        return (
            <>
                <div className="card mb-2">
                    {" "}
                    <div className="card-body ">
                        <AddCommentForm onSubmit={handleSubmit}/>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <Comments
                            comments = {comments}
                            handleRemove = {handleRemove}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit}/>
                </div>
            </div>
        );
    };
};

CommentsList.propTypes = {
    user: PropTypes.object,
    match: PropTypes.object
};

export default CommentsList;
