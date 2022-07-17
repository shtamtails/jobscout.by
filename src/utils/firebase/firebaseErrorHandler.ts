import { showNotification } from "@mantine/notifications";
import { IErrorHandler } from "interface/IFirebase";
import { AlertCircle } from "tabler-icons-react";

const displayNotification = (code: string, message: string) => {
  showNotification({
    title: code,
    autoClose: false,
    color: "red",
    message: message,
  });
};

export const firebaseErrorHandler = ({ code, notificate }: IErrorHandler): string => {
  let response;
  switch (code) {
    case "auth/too-many-requests":
      response = "Too many requests. Try again later";
      displayNotification("auth/too-many-requests", response);
      return response;
    case "auth/user-token-expired":
      response = "This user has been disabled. Try again or contact administration.";
      notificate && displayNotification("auth/user-token-expired", response);
      return response;
    case "auth/user-disabled":
      response = "This user has been disabled.";
      notificate && displayNotification("auth/user-disabled", response);
      return response;
    case "auth/web-storage-unsupported":
      response = "Web storage is not supported by this browser! Check your preferences.";
      notificate && displayNotification("auth/web-storage-unsupported", response);
      return response;
    case "auth/requires-recent-login":
      response = "Re-authentication required.";
      notificate && displayNotification("auth/requires-recent-login", response);
      return response;
    case "auth/invalid-email":
      response = "Invalid Email";
      notificate && displayNotification("auth/invalid-email", response);
      return response;
    case "auth/user-not-found":
      response = "User with this email does not exist.";
      notificate && displayNotification("auth/user-not-found", response);
      return response;
    case "auth/wrong-password":
      response = "Invalid password";
      notificate && displayNotification("auth/wrong-password", response);
      return response;
    case "auth/email-already-in-use":
      response = "Email is already registered";
      notificate && displayNotification("auth/email-already-in-use", response);
      return response;
    case "auth/invalid-action-code":
      response = "Invalid action code";
      notificate && displayNotification("auth/invalid-action-code", response);
      return response;
    default:
      response = `[${code}]. Error. Contact administration`;
      notificate && displayNotification("Unexpected error.", response);
      return response;
  }
};
