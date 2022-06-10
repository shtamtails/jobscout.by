import { Button, Checkbox, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import React, { useRef } from "react";
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
  const [loginForm, setLoginForm] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState<boolean>(false);
  const [retrieveForm, setRetrieveForm] = useState<boolean>(false);

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Login or create account"
    >
      {loginForm && !registerForm && !retrieveForm && (
        <LoginForm
          setOpened={setOpened}
          setRegisterModal={setRegisterForm}
          setRetrieveModal={setRetrieveForm}
        />
      )}
      <LoginForm
        setOpened={setOpened}
        setRegisterModal={setRegisterForm}
        setRetrieveModal={setRetrieveForm}
      />

      <RegisterForm setOpened={setOpened} />
      <RetrieveForm />
      {!registerForm ? (
        <LoginForm
          setOpened={setOpened}
          setRegisterModal={setRegisterForm}
          setRetrieveModal={setRetrieveForm}
        />
      ) : (
        <RegisterForm setOpened={setOpened} />
      )}
    </Modal>
  );
};
