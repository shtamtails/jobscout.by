export interface IReauthForm {
  callback: Function;
  setModal: Function;
}

export interface ILoginForm {
  setOpened: Function;
  setLoginModal: Function;
  setRegisterModal: Function;
  setRetrieveModal: Function;
  setLoadingOverlay: Function;
}

export interface IRegisterForm {
  setOpened: Function;
  setLoadingOverlay: Function;
}

export interface IRetrieveForm {
  setLoadingOverlay: Function;
}
