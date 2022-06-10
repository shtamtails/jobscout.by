import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";

interface RetrieveModalForm {}

export const RetrieveForm: React.FC<RetrieveModalForm> = () => {
  const [messageInput, setMessageInput] = useState<boolean>(false);

  const retrieveForm = useForm({
    initialValues: { email: "" },
    validate: (values) => ({
      email:
        values.email.indexOf("@") === -1
          ? "Invalid email"
          : values.email !== "admin@mail.com"
          ? "Account does not exist"
          : null,
    }),
  });

  const messageForm = useForm({
    initialValues: { code: "" },
    validate: (values) => ({
      code: values.code !== "123123" ? "Wrong code" : null,
    }),
  });

  const handleSubmit = (values: object): void => {
    if (messageInput === true) {
      const isCodeError = messageForm.validate().hasErrors;
      !isCodeError && console.log("retrieved");
    }
    setMessageInput(true);
  };

  return (
    <form onSubmit={retrieveForm.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        placeholder="E-mail adress or phone number"
        label="E-mail adress or phone number"
        required
        size="md"
        className="m-v-md"
        {...retrieveForm.getInputProps("email")}
      />
      {messageInput && (
        <TextInput
          placeholder="Code"
          label="Code"
          size="md"
          className="m-v-md"
          {...messageForm.getInputProps("code")}
        />
      )}
      <Button type="submit">Send message</Button>
    </form>
  );
};
