import { moviesConstants } from "../_constants/movies.constants";

export default function (state = [], action) {
    switch (action.type) {
        case moviesConstants.CREATE_MOVIES:
            return [...state, action.payload];

        case moviesConstants.CREATE_MOVIES_FAILURE:

            return state;

        default:
            return state;
    }
}


