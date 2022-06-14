import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setAuthorization, setUser } from "../store/reducers/userReducer";
import { getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

interface LoginModalForm {
  setOpened: Function;
  setLoginModal: Function;
  setRegisterModal: Function;
  setRetrieveModal: Function;
}

export const LoginForm: React.FC<LoginModalForm> = ({
  setOpened,
  setRegisterModal,
  setRetrieveModal,
  setLoginModal,
}) => {
  const dispatch = useAppDispatch();
  const { email, id, token } = useAppSelector((state) => state.user);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      // username: (value) => (value === "admin" ? null : "Invalid username"),
      password: (value) =>
        value.length < 6 ? "Password length should be longer than 6 symbols" : null,
    },
  });
  const handleLogin = () => {
    setLoginError(null);
    setPasswordError(null);
    // check from db
    const auth = getAuth();
    signInWithEmailAndPassword(auth, loginForm.values.username, loginForm.values.password)
      .then(({ user }: UserCredential) => {
        dispatch(
          setUser({
            authorized: true,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setOpened(false);
      })
      .catch((error: FirebaseError) => {
        error.message === "Firebase: Error (auth/invalid-email)." &&
          setLoginError("Invalid email or username");
        error.message === "Firebase: Error (auth/user-not-found)." &&
          setLoginError("User not found");
        error.message === "Firebase: Error (auth/wrong-password)." &&
          setPasswordError("Invalid password");
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
