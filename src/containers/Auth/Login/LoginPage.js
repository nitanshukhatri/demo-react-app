import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../_actions/user.actions";
import Joi from 'joi-browser';
import Form from '../../../common/Form';
import { Redirect } from 'react-router-dom';

class LoginPage extends Form {
  schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password')
  };
  constructor(props) {
    super(props);

    // reset login status
    //this.props.dispatch(userActions.logout());
    //this.props.logout();

    this.state = {
      data: {
        email: "",
        password: "",
      },
      submitted: false,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  doSubmit = () => {
    //   this.setState({ submitted: true });
    this.props.signIn(this.state.data);
    // const { data } = this.state;
    // const { dispatch } = this.props;
    // if (data.username && data.password) {
    //   dispatch(userActions.login(data.username, data.password));
    // }
  }

  render() {
    const { loggingIn, authError, auth } = this.props;
    // if (auth.uid) return <Redirect to="/"></Redirect>
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Password', 'password')}
          <div className="form-group">
            {this.renderButton('Login')}
            {loggingIn && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
    authError: state.authentication.authError,
    auth: state.firebase.auth

  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: (creds) => dispatch(userActions.signIn(creds)),
    logout: () => dispatch(userActions.logout())
  }
}

// export default connect(null, mapDispatchToProps)(LoginPage);
const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
