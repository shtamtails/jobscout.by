import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { useForm } from "@mantine/form";

interface RetrieveModalForm {}

export const RetrieveForm: React.FC<RetrieveModalForm> = ({}) => {
  const dispatch = useAppDispatch();
  const retrieveForm = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) =>
        value === "admin@mail.com"
          ? "Message for retrieving your account was sent to your email"
          : null,
    },
  });

  const handleRetrieve = (): void => {
    console.log("retrieve message");
  };
  return <form>qwe</form>;
};
