import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CardContainer from './components/CardContainer/CardContainer';
import GameBuilder from './containers/GameBuilder/GameBuilder';
import { LoginPage } from './containers/Auth/Login/LoginPage';
import { RegisterPage } from './containers/Auth/RegisterPage/RegisterPage';


const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CardContainer}></Route>
            <Route path="/game" component={GameBuilder}></Route>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;