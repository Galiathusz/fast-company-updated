import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    let [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });

    let [qualities, setQualities] = useState([]);
    let [professions, setProfession] = useState([]);
    let [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

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
        },
        profession: {
            isRequired: {
                message: "Обязательно выбериту вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
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

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        let isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
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
            <SelectField
                label="Выбери свою профессию"
                onChange = {handleChange}
                options = {professions}
                defaultOption = "Choose..."
                name = "profession"
                error={errors.profession}
                value = {data.profession}
            />
            <RadioField
                options = {[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "Other" }
                ]}
                value = { data.sex }
                name = "sex"
                onChange = { handleChange }
                label = "Выберите ваш пол"
            />
            <MultiSelectField
                options = { qualities }
                onChange = { handleChange }
                defaultValue = {data.qualities}
                name = "qualities"
                label = "Выберите ваши качества"
            />
            <CheckBoxField
                value = {data.licence}
                onChange = {handleChange}
                name = "licence"
                error = {errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type = "submit"
                disabled = { !isValid }
                className = "btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
