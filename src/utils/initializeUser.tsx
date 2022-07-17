import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, onValue, ref } from "firebase/database";
import { AppDispatch } from "store/store";
import { IUser } from "interface/IUser";
import { setUser, setTheme, setLanguage, removeUser } from "store/reducers/userReducer";

export const initializeUser = () => (dispatch: AppDispatch) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const usersDB = ref(database, "users/" + user.uid);
      const dbref = ref(database);
      get(child(dbref, `users/${auth.currentUser?.uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data: IUser = snapshot.val();
          dispatch(
            setUser({
              authorized: true,
              email: data.email,
              id: data.id,
              verified: data.verified,
              image: data.image,
              username: data.username,
            })
          );
        } else {
          // ! THROW ERROR
          console.log("no data");
        }
      });

      onValue(usersDB, (snapshot) => {
        const data = snapshot.val();
        data?.theme && dispatch(setTheme(data.theme));
        data?.language && dispatch(setLanguage(data.language));
      });
    } else {
      dispatch(removeUser());
    }
  });
};
