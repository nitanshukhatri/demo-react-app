import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../../_actions/user.actions';
import Form from '../../../common/Form';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';

class RegisterPage extends Form {
  schema = {
    email: Joi.string().email().required().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    firstname: Joi.string().required().label('Firstname'),
    lastname: Joi.string().required().label('Lastname')
  };
  constructor(props) {

    super(props);
    this.state = {
      data: {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      },
      submitted: false,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  doSubmit = () => {
    this.setState({ submitted: true });
    const { data } = { ...this.state };
    this.props.signUp(data);
    // const { dispatch } = this.props;
    // dispatch(userActions.signUp(data));

  }

  render() {
    const { registering, auth } = this.props;
    if (auth.uid) return <Redirect to="/"></Redirect>

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {this.renderInput('firstname', 'FirstName')}
          {this.renderInput('lastname', 'LastName')}
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          <div className="form-group">
            {this.renderButton('Register')}
            {registering &&
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }
            <Link to="/login" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
    auth: state.firebase.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(userActions.signUp(newUser))
  }
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

export { connectedRegisterPage as RegisterPage };