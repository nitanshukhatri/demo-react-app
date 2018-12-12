import { moviesConstants } from '../_constants/movies.constants';
import { toast } from "react-toastify";

export const moviesActions = {
    create,
};

export function create(movie) {
    // make call to database
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection("movies").add({
            ...movie,
            createAt: new Date()
        }).then(() => {
            dispatch({ type: moviesConstants.CREATE_MOVIES, payload: movie })
        }).catch((err) => {
            toast.error("Something Went Wrong");
            dispatch({ type: moviesConstants.CREATE_MOVIES_FAILURE, payload: err })
        })

    }

    // return { 
    //      type: moviesConstants.CREATE_MOVIES,
    //      payload:movie
    // };
}
