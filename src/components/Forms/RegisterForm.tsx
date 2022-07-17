import { useForm } from "@mantine/form";
import React from "react";
import { Button, Checkbox, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useAppDispatch } from "hooks/redux";
import { IRegisterForm } from "interface/IForms";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";
import { database } from "../../firebase";
import { set, ref } from "firebase/database";
import { setUser } from "store/reducers/userReducer";
import { firebaseRegister } from "utils/firebase/firebaseRegister";

export const RegisterForm: React.FC<IRegisterForm> = ({ setOpened, setLoadingOverlay }) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const registerForm = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
    },

    validate: {
      email: (value) => (value.indexOf("@") === -1 ? "Invalid email adress" : null),
      password: (value) => (value.length < 6 ? "Password length should be more than 6 symbols" : null),
      confirmPassword: (value, values) => (value === values.password ? null : "Passwords should match"),
      termsOfService: (value) => (value ? null : "You should accept terms of serivce"),
    },
  });

  const handleRegistration = () => {
    setError(null);
    setLoadingOverlay(true);

    firebaseRegister({
      email: registerForm.values.email,
      password: registerForm.values.password,
      onSuccess: (response: UserCredential) => {
        const user = response.user;
        set(ref(database, `users/` + user.uid), {
          email: user.email,
          id: user.uid,
          verified: user.emailVerified,
        });
        dispatch(
          setUser({
            authorized: true,
            email: user.email,
            id: user.uid,
            verified: user.emailVerified,
          })
        );
        setLoadingOverlay(false);
        setOpened(false);
      },
      onFail: (error: FirebaseError) => {
        setLoadingOverlay(false);
        setError(firebaseErrorHandler({ code: error.code, notificate: true }));
      },
    });
  };

  return (
    <form onSubmit={registerForm.onSubmit(handleRegistration)}>
      <TextInput
        placeholder="E-mail"
        label="E-mail"
        required
        size="md"
        className="m-v-md"
        error={error}
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
