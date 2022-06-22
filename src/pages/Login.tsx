import { Modal, LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { RetrieveForm } from "./RetrieveForm";

interface loginProps {
  opened: boolean;
  setOpened: any;
}

export const Login: React.FC<loginProps> = ({ opened, setOpened }) => {
  const [loginForm, setLoginForm] = useState<boolean>(true);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [retrieveForm, setRetrieveForm] = useState<boolean>(false);
  const [authOverlay, setAuthOverlay] = useState<boolean>(false);

  useEffect(() => {
    setRegisterForm(false);
    setRegisterForm(false);
  }, []);

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Login or create account"
    >
      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={authOverlay} />
        {loginForm && (
          <LoginForm
            setOpened={setOpened}
            setAuthOverlay={setAuthOverlay}
            setLoginModal={setLoginForm}
            setRegisterModal={setRegisterForm}
            setRetrieveModal={setRetrieveForm}
          />
        )}
        {registerForm && <RegisterForm setAuthOverlay={setAuthOverlay} setOpened={setOpened} />}
        {retrieveForm && <RetrieveForm setAuthOverlay={setAuthOverlay} />}
      </div>
    </Modal>
  );
};
