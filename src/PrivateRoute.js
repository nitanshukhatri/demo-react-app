
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
);

// import React, { Component } from "react";
// import { connect } from "react-redux";

// import {
//     BrowserRouter,
//     Route,
//     Switch,
//     Redirect,
//     withRouter
// } from "react-router-dom";

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//     console.log(isAuthenticated);
//     return (
//         <Route
//             {...rest}
//             render={props =>

//                 isAuthenticated === true ? (
//                     <Component {...props} />
//                 ) : (
//                         <Redirect to="/login" />
//                     )
//             }
//         />
//     )
// };

// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.authentication.loggedIn
//     };
// }

// export default withRouter(connect(mapStateToProps)(PrivateRoute));
