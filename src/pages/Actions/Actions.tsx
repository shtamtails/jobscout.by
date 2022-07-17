import React, { useMemo } from "react";
import { applyActionCode, getAuth, verifyPasswordResetCode } from "firebase/auth";
import { useState, useEffect } from "react";
import { Container, LoadingOverlay, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { AlertCircle } from "tabler-icons-react";
import { FirebaseError } from "firebase/app";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";
import { ResetPasswordForm } from "components/Forms/ResetPasswordForm";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "hooks/redux";
import { setVerified } from "store/reducers/userReducer";

export const Actions: React.FC = () => {
  const [codeConfirmed, setCodeConfirmed] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const auth = getAuth();
  const URL = window.location.href;
  const mode = URL.substring(URL.indexOf("mode") + 5, URL.indexOf("&oobCode"));
  const code = URL.substring(URL.indexOf("oobCode") + 8, URL.indexOf("&apiKey"));
  const navigate = useNavigate();

  const handleVeryfyEmail = (code: string) => {
    applyActionCode(auth, code)
      .then(() => {
        dispatch(setVerified(true));
        navigate("/");
        showNotification({ title: "Success!", message: "Email has been succesfully verified!", color: "green" });
      })
      .catch((error: FirebaseError) => {
        firebaseErrorHandler({ code: error.code, notificate: true });
      });
  };

  const handleResetPassword = (code: string) => {
    verifyPasswordResetCode(auth, code)
      .then(() => {
        setCodeConfirmed(true);
      })
      .catch((error: FirebaseError) => {
        firebaseErrorHandler({ code: error.code, notificate: true });
      });
  };

  useEffect(() => {
    mode === "resetPassword" && handleResetPassword(code);
    mode === "verifyEmail" && handleVeryfyEmail(code);
  }, []);

  return (
    <>
      <Container size="xs" sx={{ margin: 0 }}>
        <>
          <LoadingOverlay visible={!codeConfirmed} />
          {mode === "recoverEmail" && <>Recover Email</>}
          {mode === "resetPassword" && <ResetPasswordForm />}
        </>
      </Container>
    </>
  );
};
