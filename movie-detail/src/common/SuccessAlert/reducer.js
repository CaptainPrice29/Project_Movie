import { combineState } from "../util/reducerUtil";
import {
  SET_ALERT_MESSAGE_WITH_ICON,
  CLOSE_SUCCESS_ALERT,
  SET_SUCCESS_ALERT_MESSAGE_WITH_ICON,
  SET_ERROR_ALERT_MESSAGE_WITH_ICON,
  SET_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
  SET_WARNING_ALERT_MESSAGE_WITH_ICON,
  SET_ALERT_MESSAGE_WITH_ICON_WITHOUT_TRANSLATE,
  SET_CUSTOM_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
} from "./actionTypes";
import {
  MESSAGE,
  OPEN,
  ALERT_TYPE,
  TRANSLATE,
  REQUEST_ID,
  CUSTOM_MESSAGE,
} from "./stateConstants";

const initialState = {
  [MESSAGE]: "",
  [OPEN]: false,
  [ALERT_TYPE]: "",
  [TRANSLATE]: true,
  [REQUEST_ID]: "",
  [CUSTOM_MESSAGE]: "",
};

const successAlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: action[ALERT_TYPE],
        [OPEN]: true,
      });
    case SET_ALERT_MESSAGE_WITH_ICON_WITHOUT_TRANSLATE:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: action[ALERT_TYPE],
        [OPEN]: true,
        [TRANSLATE]: false,
      });
    case SET_SUCCESS_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: "success",
        [OPEN]: true,
      });
    case SET_ERROR_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: "error",
        [OPEN]: true,
      });
    case SET_WARNING_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: "warning",
        [OPEN]: true,
      });
    case SET_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [MESSAGE]: action[MESSAGE],
        [ALERT_TYPE]: "errorMessage",
        [OPEN]: true,
      });
    case SET_CUSTOM_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON:
      return combineState(state, {
        [CUSTOM_MESSAGE]: action[CUSTOM_MESSAGE],
        [ALERT_TYPE]: "errorMessage",
        [OPEN]: true,
        [REQUEST_ID]: action[REQUEST_ID],
      });
    case CLOSE_SUCCESS_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default successAlertReducer;
