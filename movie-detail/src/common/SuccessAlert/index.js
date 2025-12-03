/* eslint-disable react-hooks/static-components */
import { connect } from "react-redux";
import { closeSuccessAlert } from "./actions";
import {
  ALERT_TYPE,
  CUSTOM_MESSAGE,
  MESSAGE,
  OPEN,
  REQUEST_ID,
  TRANSLATE,
} from "./stateConstants";
import { isNilOrEmpty } from "../util/validation";
import { Text, Toaster } from "@chakra-ui/react";

const SuccessAlert = (props) => {
  const { open, alertType, message, onClose, customMessage } = props;

  const hasDefaultErrorMessage = () => {
    return (
      message?.text &&
      !isNilOrEmpty(JSON.parse(message?.text)?.detail) &&
      JSON.parse(message?.text)?.detail
    );
  };

  const checkError = () => {
    try {
      console.error(message);
      if (customMessage) {
        return `${customMessage}.`;
      } else if (message?.status === 401) {
        return "Please Login First.";
      } else if (hasDefaultErrorMessage()) {
        return hasDefaultErrorMessage();
      } else if (
        message?.text &&
        !isNilOrEmpty(JSON.parse(message?.text)?.detail) &&
        !JSON.parse(message.text)?.detail.includes("html") &&
        /^[a-zA-Z0-9!@()_+\-=[\]{};':"|,.?\s]*$/.test(
          JSON.parse(message.text).detail
        )
      ) {
        return JSON.parse(message?.text)?.detail;
      } else {
        return "Something went wrong.";
      }
    } catch (error) {
      console.error(error);
      return "Something went wrong.";
    }
  };

  const getAlertType = () => {
    if (alertType === "success") return "success";
    else if (["errorMessage", "error"].includes(alertType)) return "danger";
    else return "warning";
  };

  const Description = () => {
    const rawMsg = getAlertType() === "danger" ? checkError() : message;
    const translateMsg = rawMsg;
    const finalMsg = translateMsg;

    return <Text variant="subtitle2">{finalMsg}</Text>;
  };

  const toastProps = {
    duration: getAlertType() === "danger" ? 5000 : 4000,
    w: "auto",
    type: getAlertType(),
    hasClose: getAlertType() !== "warning",
    description: <Description />,
    onCloseComplete: onClose,
  };



  return open && <Toaster duration={toastProps.duration} type={toastProps.type} w={'auto'} hasClose={toastProps.hasClose} description={<Description />} onCloseComplete={toastProps.onCloseComplete} />;
};

const mapStateToProps = (state) => ({
  alertType: state.successAlertReducer[ALERT_TYPE],
  message: state.successAlertReducer[MESSAGE],
  open: state.successAlertReducer[OPEN],
  translate: state.successAlertReducer[TRANSLATE],
  requestId: state.successAlertReducer[REQUEST_ID],
  customMessage: state.successAlertReducer[CUSTOM_MESSAGE],
});

const mapDispatchToProps = (dispatch) => ({
  onClose: () => dispatch(closeSuccessAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SuccessAlert);
