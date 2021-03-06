import { moviesConstants } from "../_constants/movies.constants";
import { toast } from "react-toastify";

export const moviesActions = {
  create
};

export function create(movie) {
  // make call to database

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: moviesConstants.CREATE_MOVIES });
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("movies")
      .add({
        ...movie,
        // authorFirstName: profile.firstname,
        // authorLastName: profile.lastname,
        // authorId: authorId,
        createAt: new Date()
      })
      .then(() => {
        dispatch({
          type: moviesConstants.CREATE_MOVIES_SUCCESS,
          payload: movie
        });
      })
      .catch(err => {
        toast.error("Something Went Wrong");
        dispatch({ type: moviesConstants.CREATE_MOVIES_FAILURE, payload: err });
      });
  };

  // return {
  //      type: moviesConstants.CREATE_MOVIES,
  //      payload:movie
  // };
}
