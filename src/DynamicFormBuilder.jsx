import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import flatten from "core-js/fn/array/flatten";

class DynamicFormBuilder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {...props.defaultValues},
            validation_errors: {}
        };

        this.filterRules = {
            numeric: (value) => {
                return /^$|^[0-9]+$/.test(value)
            },
            decimal: (value) => {
                return /^$|^[\d.]+$/.test(value)
            }
        };

        this.transformerRules = {
            uppercase: (value) => {
                return value.toUpperCase();
            },
            lowercase: (value) => {
                return value.toLowerCase();
            }
        };

        this.validationRules = {
            required: (value) => {
                if (value) {
                    return true;
                } else {
                    return false;
                }
            },
            email: (value) => {
                return /^$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
            },
            decimal: (value) => {
                return /^$|^\d+$|^\.\d+|^\d+\.\d+$/.test(value)
            }
        };

        this.validateForm = this.validateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.propagateChange = this.propagateChange.bind(this);
    }

    applyFilter(event, filter) {
        switch (filter.constructor) {
            case(RegExp):
                return filter.test(event.target.value);
            case(Function):
                return filter(event);
            case(String):
                //Might be regex if it has been stored as JSON
                if (filter[0] === '/' && filter[filter.length - 1] === '/') {
                    const regex = new RegExp(filter.substring(1, filter.length - 1));
                    return regex.test(event.target.value);
                }

                try {
                    return this.filterRules[filter](event.target.value);
                } catch (e) {
                    console.error(`Invalid filter rule ${filter} used on input ${event.target.name}`);
                    return true;
                }
            default:
                console.error(`Invalid filter type of ${filter.constructor} on input ${event.target.name}`);
                return true;
        }
    }

    applyTransformer(event, transformer) {
        switch (transformer.constructor) {
            case(Function):
                return transformer(event);
            case(String):
                return this.transformerRules[transformer](event.target.value);
            default:
                console.error(`Invalid transformer type of ${transformer.constructor} on input ${event.target.name}`);
                return event.target.value;
        }
    }

    validateInput(name, value, rules) {
        let valid = true;
        let error_message = null;

        if (!Array.isArray(rules)) {
            rules = [rules];
        }

        rules.forEach((rule) => {
            let rule_message = null;

            if (rule.constructor === Object) {
                rule_message = rule.message;
                rule = rule.rule;
            }

            switch (rule.constructor) {
                case(Function):
                    if (!rule(name, value)) {
                        error_message = rule_message;
                        valid = false;
                    }
                    break;
                case(RegExp):
                    if (!rule.test(value)) {
                        error_message = rule_message;
                        valid = false;
                    }
                    break;
                case(String):
                    //Might be regex if it has been stored as JSON
                    if (rule[0] === '/' && rule[rule.length - 1] === '/') {
                        const regex = new RegExp(rule.substring(1, rule.length - 1));
                        if (!regex.test(value)) {
                            error_message = rule_message;
                            valid = false;
                            break;
                        }
                    }

                    try {
                        if (!this.validationRules[rule](value)) {
                            error_message = rule_message;
                            valid = false;
                        }
                    } catch (e) {
                        console.error(`Invalid filter rule ${rule} used on input ${name}`);
                    }
                    break;
                default:
                    console.error(`Invalid validation type of ${rule.constructor} on input ${name}`);
            }
        });


        const validation_error = {[name]: valid ? false : error_message || true};

        return [valid, validation_error];
    }

    applyValidation(event, validation, only_display_if_valid = false) {

        let validation_errors;

        let [valid, validation_error] = this.validateInput(event.target.name, event.target.value, validation);
        validation_errors = {...this.state.validation_errors, ...validation_error};

        if ((only_display_if_valid && valid) || !only_display_if_valid) {

            this.setState({validation_errors});
        }

        return validation_errors;
    }

    propagateChange(form, validation_errors) {
        this.setState({form});

        if (this.props.onChange) {
            this.props.onChange({
                valid: this.validateForm(false),
                data: {
                    form,
                    validation_errors
                }
            })
        }
    }

    handleInput(input, event) {
        event.persist();
        clearTimeout(this.timer);

        let validation_errors = {};

        if (input.filter && !this.applyFilter(event, input.filter)) {
            return;
        }

        let value = event.target.value;

        if (input.type === 'checkbox') {
            value = event.target.checked;
        }

        if (input.transformer && input.transformer.onChange) {
            value = this.applyTransformer(event, input.transformer.onChange);
        }

        if (input.validationRules) {
            // The third parameter, true, means that the input will not show as invalid
            // while the user is typing
            validation_errors = this.applyValidation(event, input.validationRules, true);

            this.timer = setTimeout(() => {
                this.applyValidation(event, input.validationRules)
            }, this.props.validationTimeout || 1000);
        }

        let form = this.state.form;
        form[event.target.name] = value;

        this.propagateChange(form, validation_errors);
    }

    handleBlur(input, event) {
        clearTimeout(this.timer);
        let value = event.target.value;

        let validation_errors = {};

        if (input.transformer && input.transformer.onBlur) {
            value = this.applyTransformer(event, input.transformer.onBlur);
        }

        if (input.validationRules) {
            validation_errors = this.applyValidation(event, input.validationRules);
        }

        if (this.state.form[event.target.name] !== value) {
            let form = this.state.form;
            form[event.target.name] = value;

            this.propagateChange(form, validation_errors);
        }
    }

    validateForm(display = true) {
        let invalid = false;
        let validation_errors = this.state.validation_errors;

        flatten(this.props.form).forEach((input) => {
            if (!input.validationRules) {
                return;
            }

            let [valid, validation_error] = this.validateInput(input.name, this.state.form[input.name], input.validationRules);

            validation_errors = {...validation_errors, ...validation_error};

            if (!valid) {
                invalid = true;
            }
        });

        if (display) {
            this.setState({validation_errors});
            return [!invalid, validation_errors];
        }

        return !invalid;
    }

    submitForm() {
        if (this.props.onSubmit) {

            let [valid, validation_errors] = this.validateForm();

            this.props.onSubmit({
                valid: valid,
                data: {
                    form: this.state.form,
                    validation_errors
                }
            })
        }
    }

    renderCustomInput(input) {
        if (typeof input.render !== 'function') {
            if (!React.isValidElement(input.render)) {
                return input.render;
            }

            return (
                React.cloneElement(
                    input.render,
                    {
                        name: input.name,
                        placeholder: input.placeholder,
                        value: this.state.form[input.name] || '',
                        onChange: this.handleBlur.bind(this, input),
                        invalid: !!this.state.validation_errors[input.name] || undefined
                    }
                )
            );
        }

        return input.render(
            input,
            this.state.form[input.name] || '',
            this.handleInput.bind(this, input),
            this.handleBlur.bind(this, input),
            this.state.validation_errors[input.name],
            this.state
        );
    }

    renderInput(input) {

        if (input.constructor === Array) {
            return this.renderInputs(input);
        }

        if (input.render) {
            return this.renderCustomInput(input);
        }

        const props = {
            className: `${this.props.classPrefix}-${input.inputClass || this.props.defaultInputClass || ''} ${this.state.validation_errors[input.name] || this.props.formErrors[input.name] ? this.props.invalidInputClass : this.state.validation_errors[input.name] === false ? this.props.validInputClass : ''}`,
            name: input.name,
            value: this.state.form[input.name] || input.defaultValue || '',
            placeholder: input.placeholder,
            id: input.name,
            onChange: this.handleInput.bind(this, input),
            onBlur: this.handleBlur.bind(this, input),
            ...input.htmlProps
        };

        switch (input.type) {
            case("custom"):
                return this.renderCustomInput(input);
            case("textarea"):
                return (
                    <textarea {...props} />
                );
            case("checkbox"):
                return (
                    <input {...props} type={input.type} onBlur={undefined} defaultChecked={props.defaultValue} checked={props.value} />
                );
            case("select"):
                return (
                    <select {...props} >
                        {input.defaultOptionText && (
                            <option hidden selected value>{input.defaultOptionText}</option>
                        )}
                        {(input.options || []).map((option) => {
                            return <option value={option.value}>{option.text}</option>
                        })}
                    </select>
                );
            case("radio"):
                return (
                    <Fragment>
                        {input.options.map((option, i) => {
                            return (
                                <div key={i} className={`${this.props.classPrefix}-${input.radioContainerClass || ''}`}>
                                    <input
                                        name={input.name}
                                        value={option.value}
                                        type="radio"
                                        onChange={this.handleInput.bind(this, input)}
                                    />
                                    <label>{option.text}</label>
                                </div>
                            )
                        })}
                    </Fragment>
                );
            default:
                return (
                    <input type={input.type} {...props}  />
                )
        }
    }

    renderLabel(input) {
        if (!input.label) {
            return;
        }

        const props = {
            className: this.props.classPrefix + '-' + (input.label.className || this.props.defaultLabelClass || ''),
            htmlFor: input.name
        }

        if (typeof input.label === 'function') {
            return input.label(props)
        }

        if (input.label) {
            return (
                <label {...props}>
                    {input.label.text || input.label}
                </label>
            )
        }
    }

    renderValidationErrors(input) {
        const validationError = (this.state.validation_errors[input.name] && this.state.validation_errors[input.name] !== true) ? this.state.validation_errors[input.name] : this.props.formErrors[input.name];
        if (validationError) {
            return (
                <p className={`${this.props.classPrefix}-${this.props.defaultValidationErrorClass || ''}`}>{validationError}</p>
            )
        }
    }

    renderSubmitButton() {
        if (this.props.submitButton) {
            return (
                <button
                    className={`${this.props.classPrefix}-${this.props.submitButton.className || this.props.defaultSubmitClass || ''} ${this.validateForm(false) ? '' : 'invalid'} ${this.props.loading ? 'loading' : ''}`}
                    onClick={this.submitForm}
                >
                    {this.renderSubmitButtonContents()}
                </button>
            )
        }
    }

    renderSubmitButtonContents(){
        if(this.props.loading && this.props.loadingElement){
            return this.props.loadingElement;
        }else{
            return this.props.submitButton.text
        }
    }

    renderInputs(inputs) {
        return (
            <Fragment>
                {inputs.map((input, i) => {
                    const containerClass = input.constructor === Array ?
                        `${this.props.classPrefix}-row` :
                        `${this.props.classPrefix}-${input.containerClass || this.props.defaultContainerClass || ''}`;
                    return (
                        <Fragment key={i}>
                            <div className={containerClass}>
                                {this.renderLabel(input)}
                                {this.renderInput(input)}
                                {this.renderValidationErrors(input)}
                            </div>
                        </Fragment>
                    )
                })}
            </Fragment>
        )
    }

    render() {
        try {
            return (
                <Fragment>
                    {this.renderInputs(this.props.form)}
                    {this.renderSubmitButton()}
                </Fragment>
            )
        } catch (e) {
            console.error(e);
            return (
                <p>Error rendering form</p>
            )
        }
    }
}

export default DynamicFormBuilder

DynamicFormBuilder.defaultProps = {
    defaultValues: {},
    classPrefix: 'rdf',
    defaultContainerClass: 'container',
    defaultInputClass: 'input',
    defaultValidationErrorClass: 'error-label',
    defaultLabelClass: 'label',
    form: [],
    defaultSubmitClass: 'submit',
    invalidInputClass: 'invalid',
    validInputClass: 'valid',
    loading: false,
    loadingElement: null,
    formErrors: {},
};

DynamicFormBuilder.propTypes = {
    defaultInputClass: PropTypes.string,
    defaultLabelClass: PropTypes.string,
    defaultContainerClass: PropTypes.string,
    defaultValidationErrorClass: PropTypes.string,
    defaultValues: PropTypes.object,
    form: PropTypes.array.isRequired,
    submitButton: PropTypes.object,
    validationTimeout: PropTypes.number,
    classPrefix: PropTypes.string,
    loading: PropTypes.bool,
    defaultSubmitClass: PropTypes.string,
    invalidInputClass: PropTypes.string,
    validInputClass: PropTypes.string,
    loadingElement: PropTypes.element,
    formErrors: PropTypes.object,
};
