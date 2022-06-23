import React from "react";
import { confirmPasswordReset, getAuth, verifyPasswordResetCode } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";
import { Button, Modal, PasswordInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export const Retrieve: React.FC = () => {
  const [codeConfirmed, setCodeConfirmed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const navigate = useNavigate();

  const passwordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Password length should be more than 6 symbols" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords should match" : null,
    },
  });

  const URL = window.location.href;
  const code = URL.substring(URL.indexOf("oobCode") + 8, URL.indexOf("&apiKey"));

  useEffect(() => {
    verifyPasswordResetCode(auth, code)
      .then((email) => {
        setCodeConfirmed(true);
      })
      .catch((error: FirebaseError) => {
        navigate("/");
      });
  });

  const changePassword = () => {
    confirmPasswordReset(auth, code, passwordForm.values.password)
      .then(async () => {
        navigate("/");
      })
      .catch((error: FirebaseError) => {
        switch (error.message) {
          case "auth/expired-action-code.":
            setError("Code is expired.");
            break;
          case "auth/invalid-action-code.":
            setError("Invalid code.");
            break;
          case "auth/user-disabled.":
            setError("This user account is currently disabled.");
            break;
          case "auth/user-not-found.":
            setError("User not found.");
            break;
          case "auth/weak-password.":
            setError("Password is too weak.");
            break;
        }
      });
  };

  return (
    <>
      <Modal
        centered
        opened={codeConfirmed}
        onClose={() => {
          setCodeConfirmed(false);
        }}
        title="New password"
      >
        <form onSubmit={passwordForm.onSubmit((values) => changePassword())}>
          <PasswordInput label="New password" mt="md" {...passwordForm.getInputProps("password")} />
          <PasswordInput
            label="Confirm new password"
            mt="md"
            {...passwordForm.getInputProps("confirmPassword")}
          />

          {error && (
            <Text color="red" pt="md">
              {error}
            </Text>
          )}

          <Button type="submit" fullWidth mt="md" variant="light">
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
};
