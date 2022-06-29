import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { FirebaseError } from "firebase/app";

export interface IDelete {
  path: string;
}

export const firebaseDelete = ({ path }: IDelete) => {
  const storage = getStorage();
  const fileRef = ref(storage, path);

  deleteObject(fileRef)
    .then(() => {
      // file deleted
    })
    .catch((error: FirebaseError) => {
      console.error(error);
    });
};

export interface IUpload {
  file: File;
  path: string;
  callback: Function;
  metadata?: object;
  setProgress?: Function;
  setUploadState?: Function;
  setError?: Function;
}

// * Uploads file to firebase DB and executes callback with link to this file
export const firebaseUpload = ({
  file,
  path,
  metadata,
  callback,
  setProgress,
  setUploadState,
  setError,
}: IUpload) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, path);
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
