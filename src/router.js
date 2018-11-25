import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import CardContainer from "./components/CardContainer/CardContainer";
import GameBuilder from "./containers/GameBuilder/GameBuilder";
import { LoginPage } from "./containers/Auth/Login/LoginPage";
import { RegisterPage } from "./containers/Auth/RegisterPage/RegisterPage";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    if (localStorage.getItem("user")) {
      this.isAuthenticated = true;
    }
  },
  signout(cb) {
    this.isAuthenticated = false;
    //setTimeout(cb, 100);
  }
};

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact path="/card" component={CardContainer} />
          <PrivateRoute path="/game" component={GameBuilder} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/" component={GameBuilder} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Router);

// export default Router;
