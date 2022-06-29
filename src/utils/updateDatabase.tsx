import { ref, update } from "firebase/database";
import { database } from "../firebase";
import { getAuth } from "firebase/auth";

export const DB_UPDATE_USER = (value: object) => {
  const auth = getAuth();
  const userRef = ref(database, `users/${auth.currentUser?.uid}`); // user profile in database ref
  update(userRef, value);
};
