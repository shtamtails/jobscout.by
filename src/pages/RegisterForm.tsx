import { useForm } from "@mantine/form";
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setAuthorization, setUser } from "../store/reducers/userReducer";
import {
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

interface RegisterModalForm {
  setOpened: Function;
  setAuthOverlay: Function;
}

export const RegisterForm: React.FC<RegisterModalForm> = ({ setOpened, setAuthOverlay }) => {
  const dispatch = useAppDispatch();
  const [emailError, setEmailError] = useState<string | null>(null);

  const registerForm = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
    },

    validate: {
      email: (value) => (value.indexOf("@") === -1 ? "Invalid email adress" : null),
      password: (value) =>
        value.length < 6 ? "Password length should be more than 6 symbols" : null,
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords should match",
      termsOfService: (value) => (value ? null : "You should accept terms of serivce"),
    },
  });

  const handleRegistration = () => {
    setEmailError(null);
    setAuthOverlay(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, registerForm.values.email, registerForm.values.password)
      .then(({ user }: UserCredential) => {
        dispatch(
          setUser({
            authorized: true,
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
          })
        );
        setAuthOverlay(false);
        setOpened(false);
      })

      .catch((error: FirebaseError) => {
        setAuthOverlay(false);
        error.message === "Firebase: Error (auth/email-already-in-use)." &&
          setEmailError("Email is already registered");
      });
  };

  return (
    <form onSubmit={registerForm.onSubmit((values) => handleRegistration())}>
      <TextInput
        placeholder="E-mail"
        label="E-mail"
        required
        size="md"
        className="m-v-md"
        error={emailError}
        {...registerForm.getInputProps("email")}
      />

      <Group position="apart" grow>
        <PasswordInput
          placeholder="Password"
          size="md"
          label="Password"
          required
          {...registerForm.getInputProps("password")}
        />

        <PasswordInput
          placeholder="Confirm password"
          size="md"
          label="Confirm password"
          required
          {...registerForm.getInputProps("confirmPassword")}
        />
      </Group>

      <Checkbox
        {...registerForm.getInputProps("termsOfService", { type: "checkbox" })}
        label={
          <Text className="flex">
            I accept&nbsp;
            <Link to="/legal">
              <Text variant="link">terms of service</Text>
            </Link>
          </Text>
        }
        className="m-t-lg"
      />

      <Button variant="light" color="blue" size="md" fullWidth type="submit" className="m-t-lg">
        Register
      </Button>
    </form>
  );
};
