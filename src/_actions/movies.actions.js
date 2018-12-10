import { moviesConstants } from '../_constants/movies.constants';

export const moviesActions = {
    save,
    delete,
    get,
};

export function save(movie){
    return { 
         type: moviesConstants.CREATE_MOVIES,
         payload:movie
    };
}
