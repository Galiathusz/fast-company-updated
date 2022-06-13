import React, { useState, useEffect } from "react";
import userApi from "../../../../api/fake.api/user.api";
import SelectField from "../../../common/form/selectField";
import TextAreaField from "../../../common/form/textAreaField";
import { validator } from "../../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    let initialData = { userId: "", content: "" };
    let [data, setData] = useState(initialData);
    let [users, setUsers] = useState({});
    let [errors, setErrors] = useState({});

    useEffect(() => {
        userApi.fetchAll().then(setUsers);
    }, []);

    let usersArray = users && Object.keys(users).map((userId) => ({
        label: users[userId].name,
        value: users[userId]._id
    }));

    let handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    let validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };

    let clearForm = () => {
        setData(initialData);
        setErrors({});
    };

    let validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    return (
        <>
            <h1>New comment</h1>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={usersArray}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
