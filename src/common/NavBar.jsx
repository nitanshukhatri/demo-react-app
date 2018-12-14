import React from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions';

const NavBar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="#">
                {props.profile.initials}
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {/* <li>
                        <NavLink to="/" className="btn btn-floating pink"></NavLink>
                    </li> */}
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/dashboard/movies">
                            Movies <span className="sr-only">(current)</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/dashboard/game">
                            Game
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a onClick={props.signOut} className="nav-link">
                            SignOut
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(userActions.signOut())
    }
}

const mapStateToProps = (state) => {
    console.log(mapStateToProps);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
