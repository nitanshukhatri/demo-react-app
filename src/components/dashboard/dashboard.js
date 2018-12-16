import React from "react";
import SideBar from "../../common/Sidebar";
import NavBar from "../../common/NavBar";
import GameBuilder from "../../containers/GameBuilder/GameBuilder";
import { Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import MovieDetails from "../MovieDetails/MovieDetails";
import CreateMovie from "../CreateMovie/CreateMovie";
import { PrivateRoute } from "../../PrivateRoute";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Spinner } from "react-redux-spinner";

class Dashboard extends React.Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div>
        <Spinner />
        <NavBar />
        <SideBar />
        <PrivateRoute path="/dashboard/game" component={GameBuilder} />
        <PrivateRoute path="/dashboard/movies" exact component={Movies} />
        <Route path="/dashboard/movies/create-movie" component={CreateMovie} />
        <PrivateRoute
          path="/dashboard/movie-details/:id?/:name?"
          component={MovieDetails}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default compose(connect(mapStateToProps))(Dashboard);
