import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import FormDataAddon from 'wretch/addons/formData'
// import {API_CALLED_ERROR, FORBIDDEN_ERROR, UNAUTHORIZED_ERROR} from '../../error/type'
// import {storage} from '../../common/storage/storage'
// import {store} from '../store/store'
// import {togglePorticoLoader} from '../component/porticoLoader/actions'
// import {isEmpty, isNil} from 'ramda'
// import {setGlobalErrorAlertMessageWithIcon} from '../component/SuccessAlert/actions'
// import {setIsRestrictedModalOpen} from '../component/modals/restrictedModal/action'
// import {v4 as uuidv4} from 'uuid'

// const dispatchAction = (error, type) => store.dispatch({error, type})
// export const onSetIsRestrictedModalOpen = () => store.dispatch(setIsRestrictedModalOpen(true))
// export const onSetGlobalErrorAlertMessageWithIcon = (message) =>
// 	store.dispatch(setGlobalErrorAlertMessageWithIcon(message))

// const customMiddleware = (next) => (url, opts) => {
// 	store.dispatch(togglePorticoLoader(true))
// 	const response = next(url, opts)
// 	response.finally(() => store.dispatch(togglePorticoLoader(false)))

// 	return response
// }

// export const handleUnauthorizedError = (error) => {
// 	if (error.message?.includes('Login Attempt')) {
// 		alert(JSON.parse(error.message).data)
// 	}
// 	dispatchAction(error, UNAUTHORIZED_ERROR)
// 	onSetGlobalErrorAlertMessageWithIcon(error)
// 	throw error
// }

// export const handleUncaughtError = (error, originalRequest) => {
// 	const requestId = originalRequest?._options?.headers?.['X-Request-Id']
// 	error.requestId = requestId
// 	dispatchAction(error, API_CALLED_ERROR)
// 	onSetGlobalErrorAlertMessageWithIcon(error)
// 	throw error
// }

// export const handleForbidenError = (error, originalRequest) => {
// 	const {isRestrictedModalOpen} = store.getState().restrictedModalReducer
// 	if (error?.text && !isNil(JSON.parse(error.text)?.data?.message) && !isEmpty(JSON.parse(error.text)?.data?.message)) {
// 		handleUncaughtError(error, originalRequest)
// 	}

// 	dispatchAction(error, FORBIDDEN_ERROR)
// 	// will be called only once for each 403 error
// 	if (!isRestrictedModalOpen) onSetIsRestrictedModalOpen()
// 	throw error
// }

export const wretchInstance = () =>
	wretch()
		.addon(QueryStringAddon)
		.addon(FormDataAddon)
// .auth(`Bearer ${storage.getToken()}`)
// .headers({'X-Request-Id': uuidv4()})
// .middlewares(params.showLoader ? [customMiddleware] : [])
// .catcher(401, handleUnauthorizedError)
// .catcher(403, handleForbidenError)
// .catcherFallback(
// 	errorMessage
// 		? handleUncaughtError
// 		: (error) => {
// 				throw error
// 		  },
// )
