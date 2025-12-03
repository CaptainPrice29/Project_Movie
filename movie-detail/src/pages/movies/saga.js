import { call, put, select, takeLeading, throttle } from "redux-saga/effects";
import { getMovieDataApi } from "./api";
import { setLoaders, setMovieDetail, setMovieDetailDrawerState, setMovies } from "./actions";
import { setGlobalErrorAlertMessageWithIcon } from "../../common/SuccessAlert/actions";
import { GET_MOVIE_DETAIL, GET_MOVIES_LIST } from "./actionTypes";
import { convertImdbResponse } from "./apiTemplate";
import { SEARCH_PARAM } from "./stateConstants";

const getState = (state, stateName) => state.moviesReducer[stateName]

function* getMoviesSaga() {
    try {
        const searchParam = yield select((state) => getState(state, SEARCH_PARAM))
        yield put(setLoaders({ movieListLoader: true }));
        console.log(searchParam);

        const response = yield call(getMovieDataApi, { q: searchParam || 'a' });
        if (response.ok) {
            yield put(setMovies(response?.description || []));
        }
    } catch (error) {
        yield put(setGlobalErrorAlertMessageWithIcon(error));
    } finally {
        yield put(setLoaders({ movieListLoader: false }));
    }
}
function* getMovieDetailSaga({ params }) {
    try {
        yield put(setMovieDetail({}));

        yield put(setLoaders({ movieDetailLoader: true }));
        yield put(setMovieDetailDrawerState(true));
        const response = yield call(getMovieDataApi, { tt: params || null });
        if (response.ok) {
            yield put(setMovieDetail(convertImdbResponse(response) || {}));
        }
    } catch (error) {
        yield put(setGlobalErrorAlertMessageWithIcon(error));
    } finally {
        yield put(setLoaders({ movieDetailLoader: false }));
    }
}

const moviesSaga = [throttle(2000, GET_MOVIES_LIST, getMoviesSaga), takeLeading(GET_MOVIE_DETAIL, getMovieDetailSaga)]
export default moviesSaga