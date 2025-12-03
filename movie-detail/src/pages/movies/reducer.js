import { SET_LOADERS, SET_MOVIE_DETAIL, SET_MOVIE_DETAIL_DRAWER_STATE, SET_MOVIES_LIST, SET_SEARCH_PARAM } from "./actionTypes"
import { LOADERS, MOVIE_DETAIL, MOVIE_DETAIL_DRAWER_STATE, MOVIES_LIST, SEARCH_PARAM } from "./stateConstants"

const initialState = {
    [MOVIES_LIST]: [],
    [LOADERS]: { movieListLoader: false, movieDetailLoader: false },
    [MOVIE_DETAIL]: {},
    [MOVIE_DETAIL_DRAWER_STATE]: false,
    [SEARCH_PARAM]: '',
}

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVIES_LIST:
            return {
                ...state,
                [MOVIES_LIST]: action[MOVIES_LIST],
            }
        case SET_LOADERS:
            return {
                ...state,
                [LOADERS]: { ...state[LOADERS], ...action[LOADERS] },
            }
        case SET_MOVIE_DETAIL:
            return {
                ...state,
                [MOVIE_DETAIL]: action[MOVIE_DETAIL],
            }
        case SET_MOVIE_DETAIL_DRAWER_STATE:
            return {
                ...state,
                [MOVIE_DETAIL_DRAWER_STATE]: action[MOVIE_DETAIL_DRAWER_STATE],
            }
        case SET_SEARCH_PARAM:
            return {
                ...state,
                [SEARCH_PARAM]: action[SEARCH_PARAM],
            }
        default:
            return state
    }
}
export default moviesReducer
