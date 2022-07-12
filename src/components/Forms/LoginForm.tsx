import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../store/reducers/userReducer";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { ILoginForm } from "../../interface/IForms";
import { firebaseErorHandler } from "../../firebase/firebaseErrorHandler";

export const LoginForm: React.FC<ILoginForm> = ({
  setOpened,
  setRegisterModal,
  setRetrieveModal,
  setLoginModal,
  setLoadingOverlay,
}) => {
  const dispatch = useAppDispatch();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      password: (value) => (value.length < 6 ? "Password length should be longer than 6 symbols" : null),
    },
  });

  const handleLogin = () => {
    setLoginError(null);
    setPasswordError(null);
    setLoadingOverlay(true);
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, loginForm.values.username, loginForm.values.password)
        .then(({ user }: UserCredential) => {
          dispatch(
            setUser({
              authorized: true,
              email: user.email,
              id: user.uid,
              verified: user.emailVerified,
              image: user.photoURL,
              username: user.displayName,
            })
          );
          setLoadingOverlay(false);
          setOpened(false);
        })
        .catch((error: FirebaseError) => {
          setLoadingOverlay(false);

          firebaseErorHandler({
            code: error.code,
            setLoginError,
            setPasswordError,
          });
        });
    });
  };

  return (
    <form onSubmit={loginForm.onSubmit((values) => handleLogin())}>
      <TextInput
        placeholder="Username"
        label="Username"
        required
        size="md"
        className="m-v-md"
        error={loginError}
        {...loginForm.getInputProps("username")}
      />
      <PasswordInput
        placeholder="Password"
        className="m-v-md"
        size="md"
        label="Password"
        error={passwordError}
        required
        {...loginForm.getInputProps("password")}
      />

      <Text
        variant="link"
        onClick={() => {
          setLoginModal(false);
          setRetrieveModal(true);
        }}
      >
        Forgot password?
      </Text>
      <div className="login-buttons">
        <Button
          variant="subtle"
          fullWidth
          size="md"
          className="m-r-sm"
          onClick={() => {
            setLoginModal(false);
            setRegisterModal(true);
          }}
        >
          Create new account
        </Button>
        <Button variant="default" color="blue" size="md" fullWidth type="submit" className="m-l-sm">
          Login
        </Button>
      </div>
    </form>
  );
};
