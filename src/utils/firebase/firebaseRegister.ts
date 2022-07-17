import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { IFirebaseAuth } from "interface/IFirebase";

export const firebaseRegister = ({ email, password, onSuccess, onFail }: IFirebaseAuth) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      onSuccess && onSuccess(response);
    })
    .catch((error: FirebaseError) => {
      onFail && onFail(error);
    });
};
