import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import CardContainer from './components/CardContainer/CardContainer';


const Router = () =>(
<BrowserRouter>
    <Switch>
        <Route exact path="/" component={CardContainer}></Route>
    </Switch>
</BrowserRouter>
);

export default Router;