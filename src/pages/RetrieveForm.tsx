import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, LoadingOverlay, Text, TextInput } from "@mantine/core";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

interface RetrieveModalForm {
  setAuthOverlay: Function;
}

export const RetrieveForm: React.FC<RetrieveModalForm> = ({ setAuthOverlay }) => {
  const DISABLED_TIME = 60;

  const [messageInput, setMessageInput] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [counter, setCounter] = useState<number | null>(DISABLED_TIME);
  const retrieveForm = useForm({
    initialValues: { email: "" },
    validate: (values) => ({
      email: values.email.indexOf("@") === -1 ? "Invalid email" : null,
    }),
  });

  const disableCounter = () => {
    let TIMER = DISABLED_TIME;
    const interval = setInterval(() => {
      TIMER -= 1;
      setCounter(TIMER);

      if (TIMER === 0) {
        clearInterval(interval);
        setButtonDisabled(false);
      }
    }, 1000);
  };

  const handleSubmit = (values: object): void => {
    setEmailError(null);
    setAuthOverlay(true);

    const auth = getAuth();
    sendPasswordResetEmail(auth, retrieveForm.values.email)
      .then(() => {
        setMessageInput(true);
        setButtonDisabled(true);
        disableCounter();
        setAuthOverlay(false);
      })
      .catch((error) => {
        setAuthOverlay(false);

        const errorMessage = error.message;
        console.log(errorMessage);
        errorMessage === "Firebase: Error (auth/too-many-requests)." &&
          setEmailError("Too many requests");
        errorMessage === "Firebase: Error (auth/user-not-found)." &&
          setEmailError("User with this email does not exist");
      });
  };

  return (
    <form onSubmit={retrieveForm.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        placeholder="E-mail adress or phone number"
        label="E-mail adress or phone number"
        required
        size="md"
        error={emailError}
        className="m-v-md"
        {...retrieveForm.getInputProps("email")}
      />
      {messageInput && (
        <Text color="green" className="m-v-md">
          Message with link to reset your password was sent.
        </Text>
      )}
      <Button
        type="submit"
        leftIcon={buttonDisabled && `(${counter?.toString()})`}
        disabled={buttonDisabled}
      >
        Send message
      </Button>
    </form>
  );
};
