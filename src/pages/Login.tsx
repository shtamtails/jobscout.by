import { Button, Checkbox, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { setAuthorization } from "../store/reducers/userReducer";
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
      {loginForm && (
        <LoginForm
          setOpened={setOpened}
          setLoginModal={setLoginForm}
          setRegisterModal={setRegisterForm}
          setRetrieveModal={setRetrieveForm}
        />
      )}
      {registerForm && <RegisterForm setOpened={setOpened} />}
      {retrieveForm && <RetrieveForm />}
    </Modal>
  );
};
