import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { FirebaseError } from "firebase/app";

export const firebaseUpload = (
  file: File,
  path: string,
  metaData: object,
  callback: Function,
  setProgress?: Function,
  setUploadState?: Function,
  setError?: Function
) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, path);
  const metadata = metaData;

  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    `state_changed`,
    (snapshot) => {
      if (setProgress) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }
      if (setUploadState) {
        setUploadState(snapshot.state);
      }
    },
    (error: FirebaseError) => {
      if (setError) {
        setError(error);
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
};
