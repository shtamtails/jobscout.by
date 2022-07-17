import { PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FirebaseError } from "firebase/app";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { IReauthForm } from "interface/IForms";
import { useState } from "react";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";

export const ReauthForm: React.FC<IReauthForm> = ({ callback, setModal }) => {
  const [error, setError] = useState<string | null>(null);

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
          setError(firebaseErrorHandler({ code: error.code, notificate: true }));
        });
    }
  };

  return (
    <form onSubmit={currentPasswordForm.onSubmit(reAuthUser)}>
      <PasswordInput error={error} label="Current password" {...currentPasswordForm.getInputProps("password")} />
      <Button fullWidth mt="md" mb="xs" type="submit">
        Confirm
      </Button>
    </form>
  );
};
