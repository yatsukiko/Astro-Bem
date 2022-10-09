class Form {
    form;
    #errorContainer;
    constructor(form, errorContainerId = 'form-error') {
        if (!(form instanceof HTMLFormElement )) { // - Check if value within `form` variable is a DOM element and is a form -
            return console.log(`${form} is not a valid DOM ( family ) & FORM element`)
        }

        let errorContainer = document.getElementById(errorContainerId) || false;
        if (!errorContainer) {
            errorContainer = document.getElementById('form-error') || false;
            if (!errorContainer) {
                return console.log(`Object of id '${errorContainerId}' not found `);
            }
            console.log(`Object of id '${errorContainerId}' not found, using default 'form-error' `);
        }
        this.form = form; // - Assign form ( element ) as a form ( class ) field -
        this.#errorContainer = errorContainer;
    }

    get inputs() {
        return this.form.querySelectorAll('input');
    }

    validate(params) {
        /*
        if (params instanceof Object && !(params instanceof Array || params instanceof Date)) { // - Check if params is a dictionary like object -
            console.log(`${params} is not a dict-type object`);
            return true;
        }
        */
        for (const [name, checks] of Object.entries(params)) {
            let input = undefined;
            console.log(this.inputs);
            for (const element of this.inputs) { 
                if (element.getAttribute("name") == name) {
                    input = element;
                    break;
                }
            }
            if (!input) {
                console.log(`${name} field not found`);
                continue;
            }
            console.log('input: ' + input);
            if (!checks instanceof Array) {
                console.log(`${value} is not an array`);
                return true;
            }
            for (const check of checks) {
                let Validating = new Validator(input, check);
                let isValid;
                let message;
                [isValid, message] = Validating.check();
                if (isValid) {
                    continue;
                } else {
                    this.#raiseError(message);
                    this.#focus(input);
                    return false;
                }
            }
        }
        return true;
    }

    #raiseError(text) {
        let alerts = this.#errorContainer.getElementsByClassName("alert");
        for (let i = 0; i < alerts.length; i++) {
            alerts[i].remove();
        }
        const alert = document.createElement("div");
        const content = document.createTextNode(text);
        alert.appendChild(content);
        alert.classList.add("alert");
        this.#errorContainer.appendChild(alert);
        return true;
    }

    #focus(field) {
        field.focus();
        field.select();
    }
}

class Validator {
    #input;
    #name;
    #check;
    #message;
    #isValid;
    #isBetween;
    constructor(input, check) {
        this.#input = input;
        this.#check = check;
        this.#name = input.getAttribute('name'); 
        this.#message = '';
        this.#isValid = false;
    }

    check() {
        switch(this.#check) {
            case 'email': {
                if (this.#isValidEmail()) {
                    this.#isValid = true;
                } else {
                    this.#message = this.#messages('email');
                }
                break;
            }
            case 'required': {
                if (this.#isValidRequired()) {
                    this.#isValid = true;
                } else {
                    this.#message = this.#messages('required');
                }
                break;
            }
            default: {
                console.log(`Check ${check} for ${ name } not found`);
            }
        }

        return [this.#isValid, this.#message];
    }

    #messages(message) {
        const messages = { // - Patterns for RegExp testing of values -
            required: `The ${this.#name} field is required`,
            email: `The ${this.#name} must be a valid email address`,
            between: {
                string: `The ${this.#name}`,
            },
        };
        return messages[message];
    }

    #patterns(name) {
        const pattern = { // - Patterns for RegExp testing of values -
            email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, // - Pattern from mozilla docs, read more here https://github.com/lukaqueres/Astro-Bem/issues/1#issuecomment-1264682760 -
            required: /\S/, // - Required is only tested if it is made from white spaces only -
        };
        return pattern[name];
    }

    // ->
    // - Here are declarations of methods to call for value validation ->
    // ->

    #isValidEmail() {
        this.#input.value = this.#input.value.trim();
        return this.#patterns('email').test(value);
    }

    #isValidRequired() {
        console.log(typeof(this.#input.value));
        let value = this.#input.value.trim();
        return this.#patterns('required').test(value);
    }
}
