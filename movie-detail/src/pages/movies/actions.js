import { GET_MOVIE_DETAIL, GET_MOVIES_LIST, SET_LOADERS, SET_MOVIE_DETAIL, SET_MOVIE_DETAIL_DRAWER_STATE, SET_MOVIES_LIST, SET_SEARCH_PARAM } from "./actionTypes"

export const setSearchParam = (searchParam) => {
    return {
        type: SET_SEARCH_PARAM,
        searchParam,
    }
}

export const getMovies = () => {
    return {
        type: GET_MOVIES_LIST,
    }
}

export const setMovies = (moviesList) => {
    return {
        type: SET_MOVIES_LIST,
        moviesList,
    }
}

export const getMovieDetail = (params) => {
    return {
        type: GET_MOVIE_DETAIL,
        params,
    }
}

export const setMovieDetail = (movieDetail) => {
    return {
        type: SET_MOVIE_DETAIL,
        movieDetail,
    }
}

export const setLoaders = (loaders) => {
    return {
        type: SET_LOADERS,
        loaders,
    }
}

export const setMovieDetailDrawerState = (movieDetailDrawerState) => {
    return {
        type: SET_MOVIE_DETAIL_DRAWER_STATE,
        movieDetailDrawerState,
    }
}
