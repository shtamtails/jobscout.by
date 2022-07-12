import React from "react";
import { getAuth, verifyPasswordResetCode } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { Container, LoadingOverlay } from "@mantine/core";
import { firebaseErorHandler } from "../../firebase/firebaseErrorHandler";
import { RetrieveNewPasswordForm } from "../../components/Forms/RetrieveNewPasswordForm";
import { showNotification } from "@mantine/notifications";
import { AlertCircle } from "tabler-icons-react";

export const Retrieve: React.FC = () => {
  const [codeConfirmed, setCodeConfirmed] = useState<boolean>(true);
  const [firebaseError, setFirebaseError] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const URL = window.location.href;
    const code = URL.substring(URL.indexOf("oobCode") + 8, URL.indexOf("&apiKey"));

    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setCodeConfirmed(true);
      })
      .catch((error: FirebaseError) => {
        showNotification({
          title: "Error!",
          autoClose: false,
          color: "red",
          icon: <AlertCircle />,
          message: firebaseErorHandler({ code: error.code, setOtherError: setFirebaseError }),
        });
      });
  }, []);

  return (
    <>
      <Container size="xs" sx={{ margin: 0 }}>
        {!firebaseError && (
          <>
            <LoadingOverlay visible={!codeConfirmed} />
            <RetrieveNewPasswordForm />
          </>
        )}
      </Container>
    </>
  );
};
