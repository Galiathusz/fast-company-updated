import React, { useState, useEffect } from "react";
import api from "../../../../api";
import PropTypes from "prop-types";

const Comment = ({ content, created_at: created, _id: id, userId, handleRemove }) => {
    let [user, setUser] = useState();
    let [isLoading, setIsLoading] = useState(false);

    let months = ["января", "феввраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
    let convertDate = (milliSecondsDate) => {
        let date = new Date(Number(milliSecondsDate));
        let dateNow = new Date();

        let year = dateNow.getFullYear() - date.getFullYear();
        let month = date.getMonth() + 1;
        let day = dateNow.getDate() - date.getDate();
        let hour = dateNow.getHours() - date.getHours();
        let minutes = dateNow.getMinutes() - date.getMinutes();

        if (year >= 1) {
            return date.getDate() + " " + `${months[month - 1]}` + " " + date.getFullYear();
        } else {
            if (day === 0) {
                if (hour === 0) {
                    if (minutes >= 0 && minutes < 5) {
                        return "1 минуту назад";
                    }
                    if (minutes >= 5 && minutes < 10) {
                        return "5 минут назад";
                    }
                    if (minutes >= 10 && minutes < 30) {
                        return "10 минут назад";
                    }
                    return "30 минут назад";
                };
                return `${date.getHours()}:${date.getMinutes()}`;
            }
            return date.getDate() + " " + `${months[month - 1]}`;
        };
    };

    useEffect(() => {
        setIsLoading(true);
        api.users.getById(userId).then((data) => setUser(data));
        setIsLoading(false);
    }, []);

    if (!isLoading) {
        return (
            <>
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div className="flex-grow-1 flex-shrink-1">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1 ">
                                                {`${user && user.name} - `}
                                                <span className="small">
                                                    {convertDate(created)}
                                                </span>
                                            </p>
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() => handleRemove(id)}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">{content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return "Loading";
    };
};

Comment.propTypes = {
    content: PropTypes.string,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userId: PropTypes.string,
    _id: PropTypes.string,
    handleRemove: PropTypes.func
};

export default Comment;
