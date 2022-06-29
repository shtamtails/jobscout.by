import { getAuth, onAuthStateChanged } from "firebase/auth";
import { child, get, onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { removeUser, setLanguage, setTheme, setUser, IUser } from "../store/reducers/userReducer";
import { AppDispatch } from "../store/store";

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
