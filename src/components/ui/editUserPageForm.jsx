import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import api from "../../api";
import { validator } from "../../utils/validator";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const EditUserPageForm = ({ userId }) => {
    let [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });

    let [qualities, setQualities] = useState([]);
    let [professions, setProfession] = useState([]);
    let [errors, setErrors] = useState({});
    let [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

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

    let formData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    useEffect(() => {
        setIsLoading(true);
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: formData(qualities),
                profession: profession._id
            }))
        );
    }, []);

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    let handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    let validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }).then((data) => history.push(`/users/${data._id}`));
    };
    if (!isLoading) {
        return (
            <form onSubmit = {handleSubmit}>
                <TextField
                    label = "Имя"
                    name = "name"
                    value = {data.name}
                    onChange = {handleChange}
                    error = {errors.name}
                />
                <TextField
                    label = "Электронная почта"
                    name = "email"
                    value = {data.email}
                    onChange = {handleChange}
                    error = {errors.email}
                />
                <SelectField
                    label="Выбери свою профессию"
                    onChange = {handleChange}
                    options = {professions}
                    defaultOption = "Choose..."
                    name = "profession"
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
                    defaultValue = { data.qualities }
                    name = "qualities"
                    label = "Выберите ваши качества"
                />
                <button
                    type = "submit"
                    disabled = { !isValid }
                    className = "btn btn-primary w-100 mx-auto"
                >
                    Обновить
                </button>
            </form>
        );
    } else {
        return (
            <h1>Loading</h1>
        );
    }
};

EditUserPageForm.propTypes = {
    userId: PropTypes.string
};

export default EditUserPageForm;
