import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    let [data, setData] = useState({ email: "", password: "" });
    let [errors, setErrors] = useState({});
    let handleChange = ({ target }) => {
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className = "mb-4">Login</h3>
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
                        <button type = "submit" disabled = {!isValid} className = "btn btn-primary w-100 mx-auto">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
