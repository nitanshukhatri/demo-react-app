import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../components/Input/Input';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        if (!error) return null;
        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message
        }
        return errors;
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
        this.doSubmit();
    }




    handleChange = (e) => {
        const { name, value } = e.target;
        const errors = { ...this.state.errors };

        const errorMessage = this.validateProperty(e.target)
        if (errorMessage) {
            errors[name] = value
        } else {
            delete errors[name]
        }
        const data = { ...this.state.data }
        data[name] = value
        this.setState({ data, errors });
    }

    renderButton(label) {
        return <button className="btn btn-primary" >{label}</button>
    }

    renderInput(name, label, type = 'text') {
        const { data, errors } = { ...this.state }
        return <Input type={type} name={name} value={data[name]} label={label} onChange={this.handleChange} error={errors[name]}></Input>
    }


}

export default Form;