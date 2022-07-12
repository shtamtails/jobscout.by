interface IErrorHandler {
  code: string;
  setEmailError?: Function;
  setLoginError?: Function;
  setPasswordError?: Function;
  setOtherError?: Function;
}

export const firebaseErorHandler = ({
  code,
  setEmailError,
  setLoginError,
  setPasswordError,
  setOtherError,
}: IErrorHandler) => {
  switch (code) {
    case "auth/app-not-authorized":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/app-deleted":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/argument-error":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/invalid-api-key":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/invalid-tenant-id":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/operation-not-allowed":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/unauthorized-domain":
      setOtherError && setOtherError(`[${code}]. Something went wrong. Contact administration.`);
      break;
    case "auth/too-many-requests":
      setOtherError && setOtherError(`Too many requests. Try again later.`);
      break;
    case "auth/user-token-expired":
      setOtherError && setOtherError(`This user has been disabled. Try again or contact administration.`);
      break;
    case "auth/user-disabled":
      setOtherError && setOtherError(`This user has been disabled.`);
      break;
    case "auth/web-storage-unsupported":
      setOtherError && setOtherError(`Web storage is not supported by this browser! Check your preferences.`);
      break;
    case "auth/requires-recent-login":
      setOtherError && setOtherError(`Re-authentication required.`);
      break;
    case "auth/invalid-email":
      setLoginError && setLoginError("Invalid email");
      break;
    case "auth/user-not-found":
      setLoginError && setLoginError("User with this username or email not found");
      setEmailError && setEmailError("User with this email not found");
      break;
    case "auth/wrong-password":
      setPasswordError && setPasswordError("Invalid password");
      break;
    case "auth/email-already-in-use":
      setEmailError && setEmailError("Email is already registered");
      break;
    case "auth/invalid-action-code":
      setOtherError && setOtherError("Invalid action code");
      return "Invalid action code";
  }
};

firebaseErorHandler({ code: "auth/app-not-authorized" });
