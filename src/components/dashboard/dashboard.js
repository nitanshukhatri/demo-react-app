import React from "react";
import SideBar from "../../common/Sidebar";
import NavBar from "../../common/NavBar";
import GameBuilder from "../../containers/GameBuilder/GameBuilder";
import { Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import MovieDetails from "../MovieDetails/MovieDetails";
import { PrivateRoute } from "../../PrivateRoute";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        dashboard
        <NavBar />
        <SideBar />
        <Route path="/dashboard/game" component={GameBuilder} />
        <Route path="/dashboard/movies" component={Movies} />
        <PrivateRoute
          path="/dashboard/movie-details/:id?/:name?"
          component={MovieDetails}
        />{" "}
        */}
      </div>
    );
  }
}

export default Dashboard;
