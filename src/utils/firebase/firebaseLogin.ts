import { FirebaseError } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { IFirebaseAuth } from "interface/IFirebase";

export const firebaseLogin = ({ email, password, onSuccess, onFail }: IFirebaseAuth) => {
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        onSuccess && onSuccess(response);
      })
      .catch((error: FirebaseError) => {
        console.log(error);
        onFail && onFail(error);
      });
  });
};
