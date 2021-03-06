import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    let [data, setData] = useState({ email: "", password: "", stayOn: false });
    let [errors, setErrors] = useState({});
    let handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    let validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букуву"
            },
            isContaintDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    let validate = () => {
        let errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    let isValid = Object.keys(errors).length === 0;

    let handleSubmit = (e) => {
        e.preventDefault();
        let isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit = {handleSubmit}>
            <TextField
                label = "Электронная почта"
                name = "email"
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />
            <TextField
                label = "Пароль"
                type = "password"
                name = "password"
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />
            <CheckBoxField
                value = {data.stayOn}
                onChange = {handleChange}
                name = "stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button type = "submit" disabled = {!isValid} className = "btn btn-primary w-100 mx-auto">Submit</button>
        </form>
    );
};

export default LoginForm;
