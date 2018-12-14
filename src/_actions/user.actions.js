import { userConstants } from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import { alertActions } from "./alert.actions";
import { history } from "../_helpers/history";

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
  signIn,
  signOut,
  signUp
};

function signIn(credentials) {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((res) => {
      console.log(res);
      dispatch({ type: userConstants.LOGIN_SUCCESS, res });
      if (res) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(res.user));
      }
      history.push("/");
    }).catch((err) => {
      dispatch({ type: userConstants.LOGIN_FAILURE, err });
    })
  }

}

function signOut() {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({ type: userConstants.LOGOUT });
      localStorage.removeItem("user");
      history.push("/login");
    });
  }
}

function signUp(newUser) {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((res) => {

      return firestore.collection('users').doc(res.user.uid).set({
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        initials: newUser.firstname[0] + newUser.lastname[0]
      })
    }).then(() => {
      dispatch({ type: userConstants.REGISTER_SUCCESS });
      history.push("/");
    }).catch(err => {
      dispatch({ type: userConstants.REGISTER_FAILURE, err });
    })

  }
}

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push("/login");
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService
      .getAll()
      .then(
        users => dispatch(success(users)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(
        user => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
