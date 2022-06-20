import { Modal, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react";

interface useReauthInterface {
  callback: Function | null;
  modal: boolean;
  setModal: Function;
}

export const ReauthModal: React.FC<useReauthInterface> = ({ callback, modal, setModal }) => {
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();
  const user = auth.currentUser;
  const currentPasswordForm = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => (value.length < 6 ? "Password should be atleast 6 symbols long" : null),
    },
  });

  const reAuthUser = () => {
    if (user?.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPasswordForm.values.password
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          setModal(false);
          if (callback) {
            callback();
          }
        })
        .catch((error: FirebaseError) => {
          error.code === "auth/wrong-password" && setError("Wrong password.");
          error.code === "auth/too-many-requests" &&
            setError("Too many attempts. Try again later.");
        });
    }
  };

  return (
    <>
      <Modal centered opened={modal} onClose={() => setModal(false)} title="Confirm action">
        <form
          onSubmit={currentPasswordForm.onSubmit((values) => {
            reAuthUser();
          })}
        >
          <PasswordInput
            error={error}
            label="Current password"
            {...currentPasswordForm.getInputProps("password")}
          />
          <Button fullWidth mt="md" mb="xs" type="submit">
            Confirm
          </Button>
        </form>
      </Modal>
    </>
  );
};
