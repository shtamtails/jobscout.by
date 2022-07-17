import { PasswordInput, Button, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";

export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | null>(null);

  const passwordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) => (value.length < 6 ? "Password length should be more than 6 symbols" : null),
      confirmPassword: (value, values) => (value !== values.password ? "Passwords should match" : null),
    },
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const URL = window.location.href;
  const code = URL.substring(URL.indexOf("oobCode") + 8, URL.indexOf("&apiKey"));

  const changePassword = () => {
    confirmPasswordReset(auth, code, passwordForm.values.password)
      .then((response) => {
        navigate("/");
        showNotification({ title: "Success!", message: "Password has been succesfully reseted", color: "green" });
      })
      .catch((error: FirebaseError) => {
        setError(firebaseErrorHandler({ code: error.code, notificate: true }));
      });
  };

  return (
    <form onSubmit={passwordForm.onSubmit((values) => changePassword())}>
      <PasswordInput label="New password" mt="md" {...passwordForm.getInputProps("password")} />
      <PasswordInput label="Confirm new password" mt="md" {...passwordForm.getInputProps("confirmPassword")} />

      {error && (
        <Text color="red" pt="md">
          {error}
        </Text>
      )}

      <Button type="submit" fullWidth mt="md" variant="light">
        Save
      </Button>
    </form>
  );
};
