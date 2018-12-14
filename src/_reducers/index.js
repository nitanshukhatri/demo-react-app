import { combineReducers } from "redux";

import { authentication } from "./authentication.reducer";
import { registration } from "./registration.reducer";
import { users } from "./users.reducer";
import { alert } from "./alert.reducer";
import movies from "./movies.reducer";
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  movies,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
