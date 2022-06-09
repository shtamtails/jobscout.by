import { Button, Checkbox, Group, Modal, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useModals } from "@mantine/modals";
import React, { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [opened, setOpened] = useState<boolean>(true);
  const [registerModal, setRegisterModal] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

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
      confirmPassword: (value) =>
        value === passwordRef.current?.value ? null : "Passwords should match",
      termsOfService: (value) => (value ? null : "You should accept terms of serivce"),
    },
  });

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={() => setOpened(false)}
      title="Login or create account"
    >
      {!registerModal ? (
        <form onSubmit={loginForm.onSubmit((values) => console.log("Loggined in"))}>
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

          <Link to="/retrieve">
            <Text variant="link">Forgot password?</Text>
          </Link>
          <div className="login-buttons">
            <Button
              variant="subtle"
              fullWidth
              size="md"
              className="m-r-sm"
              onClick={() => {
                setRegisterModal(true);
              }}
            >
              Create new account
            </Button>
            <Button
              variant="default"
              color="blue"
              size="md"
              fullWidth
              type="submit"
              className="m-l-sm"
            >
              Login
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={registerForm.onSubmit((values) => console.log("registered"))}>
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
              ref={passwordRef}
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
      )}
    </Modal>
  );
};
