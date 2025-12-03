import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RESET_ALL_REDUCERS } from "./actionTypes";
import sagas from "../saga";
import { all } from "redux-saga/effects";
import moviesReducer from "../../pages/movies/reducer";
import successAlertReducer from "../../common/SuccessAlert/reducer";

// Combine reducers
const appReducer = combineReducers({
  moviesReducer,
  successAlertReducer,
});

// Add root reducer with RESET_ALL_REDUCERS handling
const rootReducer = (state, action) => {
  if (action.type === RESET_ALL_REDUCERS) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Root saga
function* rootSaga() {
  yield all(sagas.map((saga) => saga));
}

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store using Redux Toolkit
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // because we use saga
      serializableCheck: false, // optional: disables warnings for non-serializable values
    }).concat(sagaMiddleware),
  devTools: true,
});

// Run sagas
sagaMiddleware.run(rootSaga);
