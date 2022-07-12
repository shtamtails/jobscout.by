import { Modal, LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { LoginForm } from "../components/Forms/LoginForm";
import { RegisterForm } from "../components/Forms/RegisterForm";
import { RetrieveForm } from "../components/Forms/RetrieveForm";

interface loginProps {
  opened: boolean;
  setOpened: any;
}

export const Login: React.FC<loginProps> = ({ opened, setOpened }) => {
  const [loginForm, setLoginForm] = useState<boolean>(true);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [retrieveForm, setRetrieveForm] = useState<boolean>(false);
  const [loadingOverlay, setLoadingOverlay] = useState<boolean>(false);

  useEffect(() => {
    setRegisterForm(false);
    setRetrieveForm(false);
  }, []);

  return (
    <Modal centered size="lg" opened={opened} onClose={() => setOpened(false)} title="Login or create account">
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loadingOverlay} />
        {loginForm && (
          <LoginForm
            setOpened={setOpened}
            setLoadingOverlay={setLoadingOverlay}
            setLoginModal={setLoginForm}
            setRegisterModal={setRegisterForm}
            setRetrieveModal={setRetrieveForm}
          />
        )}
        {registerForm && <RegisterForm setLoadingOverlay={setLoadingOverlay} setOpened={setOpened} />}
        {retrieveForm && <RetrieveForm setLoadingOverlay={setLoadingOverlay} />}
      </div>
    </Modal>
  );
};
