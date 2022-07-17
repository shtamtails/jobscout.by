export interface IFirebaseAuth {
  email: string;
  password: string;
  onSuccess?: Function;
  onFail?: Function;
}

export interface IErrorHandler {
  code: string;
  notificate?: boolean;
}
