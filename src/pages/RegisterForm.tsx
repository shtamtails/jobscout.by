import { useForm } from "@mantine/form";
import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { setAuthorization, setUser } from "../store/reducers/userReducer";
import { Button, Checkbox, Group, PasswordInput, Text, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";

interface RegisterModalForm {
  setOpened: Function;
}

export const RegisterForm: React.FC<RegisterModalForm> = ({ setOpened }) => {
  const dispatch = useAppDispatch();

  const registerForm = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      username: (value) => (value !== "admin" ? null : "Account with this username already exists"),
      email: (value) =>
        value !== "admin@mail.com" ? null : "Account with this e-mail already exists",
      password: (value) =>
        value.length < 6 ? "Password length should be more than 6 symbols" : null,
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords should match",
      termsOfService: (value) => (value ? null : "You should accept terms of serivce"),
    },
  });

  const handleRegistration = () => {
    // push to db
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, registerForm.values.email, registerForm.values.password)
      .then(async ({ user }: UserCredential) => {
        console.log(user);
      })
      .catch(console.error);
    console.log("registered");
    dispatch(setAuthorization(true));
    setOpened(false);
  };

  return (
    <form onSubmit={registerForm.onSubmit((values) => handleRegistration())}>
      <TextInput
        placeholder="Username"
        label="Username"
        required
        size="md"
        className="m-v-md"
        {...registerForm.getInputProps("username")}
      />
      <TextInput
        placeholder="E-mail"
        label="E-mail"
        required
        size="md"
        className="m-v-md"
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
