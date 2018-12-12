import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Router as BRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import NavBar from "./common/NavBar";
import CardContainer from "./components/CardContainer/CardContainer";
import Dashboard from "./components/Dashboard/Dashboard";
import Movies from "./components/Movies/Movies";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import NotFound from "./components/NotFound/NotFound";
import GameBuilder from "./containers/GameBuilder/GameBuilder";
import { LoginPage } from "./containers/Auth/Login/LoginPage";
import { RegisterPage } from "./containers/Auth/RegisterPage/RegisterPage";
import { PrivateRoute } from "./PrivateRoute";
import { history } from "./_helpers/history";
import http from "./_services/http.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "./firebase";

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
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // database.ref().on("value", (snapshot) => {
    //   console.log("The Data Changed !", snapshot.val());
    // });
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <BRouter history={history}>
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/card" component={CardContainer} />
            {/* <PrivateRoute path="/game" component={GameBuilder} /> */}
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            {/* <PrivateRoute path="/movies" component={Movies} />
            <PrivateRoute path="/movie/:id?/:name?" component={MovieDetails} /> */}
            <Route path="/not-found" exact component={NotFound} />
            <PrivateRoute path="/" exact component={Dashboard} />
            {/* <Redirect to="/not-found" /> */}
          </Switch>
        </BRouter>
      </React.Fragment>
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
