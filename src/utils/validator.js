export function validator(data, config) {
    let errors = {};
    function validate(validateMethod, data, config) {
        let statusValidate;
        switch (validateMethod) {
        case "isRequired":{
            if (typeof data === "boolean") {
                statusValidate = !data;
            } else {
                statusValidate = data.trim() === "";
            }
            break;
        }
        case "isEmail": {
            let emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = !emailRegExp.test(data);
            break;
        }
        case "isCapitalSymbol": {
            let capitalRegExp = /[A-Z]+/g;
            statusValidate = !capitalRegExp.test(data);
            break;
        }
        case "isContaintDigit": {
            let digitRegExp = /\d+/g;
            statusValidate = !digitRegExp.test(data);
            break;
        }
        case "min": {
            statusValidate = data.length < config.value;
            break;
        }
        default:
            break;
        }
        if (statusValidate) return config.message;
    }
    for (let fieldName in data) {
        for (let validateMethod in config[fieldName]) {
            let error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
};
