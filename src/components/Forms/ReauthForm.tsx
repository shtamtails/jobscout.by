import { Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, User } from "firebase/auth";
import React, { useMemo, useState } from "react";
import { IReauthForm } from "../../interface/IForms";
import { firebaseErorHandler } from "../../firebase/firebaseErrorHandler";

export const ReauthForm: React.FC<IReauthForm> = ({ callback, setModal }) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const currentPasswordForm = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => (value.length < 6 ? "Password should be atleast 6 symbols long" : null),
    },
  });

  const reAuthUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user?.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPasswordForm.values.password);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          setModal(false);
          callback();
        })
        .catch((error: FirebaseError) => {
          firebaseErorHandler({ code: error.code, setPasswordError });
        });
    }
  };

  return (
    <form onSubmit={currentPasswordForm.onSubmit(reAuthUser)}>
      <PasswordInput
        error={passwordError}
        label="Current password"
        {...currentPasswordForm.getInputProps("password")}
      />
      <Button fullWidth mt="md" mb="xs" type="submit">
        Confirm
      </Button>
    </form>
  );
};
