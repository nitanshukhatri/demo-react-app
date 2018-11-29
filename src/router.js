import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Router as BRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import CardContainer from "./components/CardContainer/CardContainer";
import GameBuilder from "./containers/GameBuilder/GameBuilder";
import { LoginPage } from "./containers/Auth/Login/LoginPage";
import { RegisterPage } from "./containers/Auth/RegisterPage/RegisterPage";
import { PrivateRoute } from './PrivateRoute';
import { history } from './_helpers/history';

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
      <BRouter history={history}>
        <Switch>
          <PrivateRoute exact path="/card" component={CardContainer} />
          <PrivateRoute path="/game" component={GameBuilder} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <PrivateRoute path="/" component={GameBuilder} />
        </Switch>
      </BRouter>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated: state.authentication.loggedIn
//   };
// };
// export default connect(mapStateToProps)(Router);


export default Router;
