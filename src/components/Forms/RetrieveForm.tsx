import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Text, TextInput } from "@mantine/core";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { IRetrieveForm } from "interface/IForms";
import { disableButtonTimer } from "utils/disableButtonTimer";
import { firebaseErrorHandler } from "utils/firebase/firebaseErrorHandler";

export const RetrieveForm: React.FC<IRetrieveForm> = ({ setLoadingOverlay }) => {
  const [error, setError] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(60);

  const retrieveForm = useForm({
    initialValues: { email: "" },
    validate: (values) => ({
      email: values.email.indexOf("@") === -1 ? "Invalid email" : null,
    }),
  });

  const handleRetrieve = (): void => {
    setError(null);
    setLoadingOverlay(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, retrieveForm.values.email)
      .then(() => {
        setMessageInput(true);
        disableButtonTimer({
          time: counter,
          setCounter: setCounter,
          setButtonDisalbed: setButtonDisabled,
        });
        setLoadingOverlay(false);
      })
      .catch((error) => {
        setLoadingOverlay(false);
        setError(firebaseErrorHandler({ code: error.code, notificate: true }));
      });
  };

  return (
    <form onSubmit={retrieveForm.onSubmit(handleRetrieve)}>
      <TextInput
        placeholder="E-mail adress or phone number"
        label="E-mail adress or phone number"
        required
        size="md"
        error={error}
        className="m-v-md"
        {...retrieveForm.getInputProps("email")}
      />
      {messageInput && (
        <Text color="green" className="m-v-md">
          Message with link to reset your password was sent.
        </Text>
      )}
      <Button type="submit" leftIcon={buttonDisabled && `(${counter?.toString()})`} disabled={buttonDisabled}>
        Send message
      </Button>
    </form>
  );
};
