import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { setAuthorization } from "../store/reducers/userReducer";

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

  const loginForm = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) => (value === "admin" ? null : "Invalid username"),
      password: (value) => (value === "root" ? null : "Invalid password"),
    },
  });
  const handleLogin = () => {
    // check from db
    console.log("logined");
    dispatch(setAuthorization(true));
    setOpened(false);
  };
  return (
    <form onSubmit={loginForm.onSubmit((values) => handleLogin())}>
      <TextInput
        placeholder="Username"
        label="Username"
        required
        size="md"
        className="m-v-md"
        {...loginForm.getInputProps("username")}
      />
      <PasswordInput
        placeholder="Password"
        className="m-v-md"
        size="md"
        label="Password"
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
