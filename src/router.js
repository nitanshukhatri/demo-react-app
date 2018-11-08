import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CardContainer from './components/CardContainer/CardContainer';
import GameBuilder from './containers/GameBuilder/GameBuilder';


const Router = () =>(
<BrowserRouter>
    <Switch>
        <Route exact path="/" component={CardContainer}></Route>
        <Route path="/game" component={GameBuilder}></Route>
    </Switch>
</BrowserRouter>
);

export default Router;