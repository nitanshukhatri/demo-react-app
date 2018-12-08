import React from 'react';
import SideBar from '../../common/Sidebar';
import GameBuilder from "../../containers";
import { Route } from 'react-router-dom';
import Movies from "../Movies/Movies";

class dashboard extends React.Component {
  render() {
    return (
      <div>
        dashboard
        <SideBar></SideBar>
        <Route path="/dashboard/game" component={GameBuilder}></Route>
        <Route path="/dashboard/movies" component={Movies}></Route>
      </div>
    );
  }
}

export default dashboard;
