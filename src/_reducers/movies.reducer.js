import { moviesConstants } from "../_constants/movies.constants";

export default function(state = [], action) {
  switch (action.type) {
    case moviesConstants.CREATE_MOVIES:
      return [...state, action.payload];
    default:
      return state;
  }
}
