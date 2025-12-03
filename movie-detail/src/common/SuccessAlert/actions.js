import {
	SET_ALERT_MESSAGE_WITH_ICON,
	CLOSE_SUCCESS_ALERT,
	SET_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
	SET_ERROR_ALERT_MESSAGE_WITH_ICON,
	SET_SUCCESS_ALERT_MESSAGE_WITH_ICON,
	SET_WARNING_ALERT_MESSAGE_WITH_ICON,
	SET_ALERT_MESSAGE_WITH_ICON_WITHOUT_TRANSLATE,
	SET_CUSTOM_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
} from './actionTypes'

export const setAlertMessageWithIcon = (message, alertType) => ({
	type: SET_ALERT_MESSAGE_WITH_ICON,
	message,
	alertType,
})

export const setAlertMessageWithIconWithoutTranslate = (message, alertType) => ({
	type: SET_ALERT_MESSAGE_WITH_ICON_WITHOUT_TRANSLATE,
	message,
	alertType,
})

export const setSuccessAlertMessageWithIcon = (message) => ({
	type: SET_SUCCESS_ALERT_MESSAGE_WITH_ICON,
	message,
})
export const setErrorAlertMessageWithIcon = (message) => ({
	type: SET_ERROR_ALERT_MESSAGE_WITH_ICON,
	message,
})
export const setGlobalErrorAlertMessageWithIcon = (message) => ({
	type: SET_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
	message,
})
export const setWarningAlertMessageWithIcon = (message) => ({
	type: SET_WARNING_ALERT_MESSAGE_WITH_ICON,
	message,
})
export const closeSuccessAlert = () => ({
	type: CLOSE_SUCCESS_ALERT,
})
export const setCustomGlobalErrorAlertMessage = (requestId, customMessage) => ({
	type: SET_CUSTOM_GLOBAL_ERROR_ALERT_MESSAGE_WITH_ICON,
	requestId,
	customMessage,
})
