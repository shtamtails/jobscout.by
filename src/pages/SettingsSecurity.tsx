import {
  Button,
  Card,
  Container,
  Modal,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { SettingContainer } from "../components/SettingContainer";
import { SettingFooter } from "../components/SettingFooter";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { LoginForm } from "./LoginForm";
import { ToolsKitchenOff } from "tabler-icons-react";
import { FirebaseError } from "firebase/app";
import { ReauthModal } from "../components/ReauthModal";
import { useEffect } from "react";

export const SettingsSecurity: React.FC = () => {
  const theme = useMantineTheme();
  const auth = getAuth();
  const user = auth.currentUser;

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  });

  const [modal, setModal] = useState<boolean>(false);
  const [callback, setCallback] = useState<Function | null>(null);

  const [passowrdButtonLoading, setPasswordButtonLoading] = useState<boolean>(false);
  const [passowrdButtonSuccess, setPasswordButtonSuccess] = useState<boolean>(false);

  const [emailButtonLoading, setEmailButtonLoading] = useState<boolean>(false);
  const [emailButtonSuccess, setEmailButtonSuccess] = useState<boolean>(false);

  const changePasswordForm = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: (values) => ({
      password:
        values.password.length < 6
          ? "Password should be atleast 6 symbols long"
          : values.password.search(/[A-Za-z]/) === -1
          ? "Password should contain letters"
          : values.password.search(/[^0-9]/) === -1
          ? "Passowrd should contain numbers"
          : null,
      confirmPassword: values.confirmPassword !== values.password ? "Passwords should match" : null,
    }),
  });

  const currentPasswordForm = useForm({
    initialValues: {
      password: "",
    },
    validate: {
      password: (value) => (value.length < 6 ? "Password should be atleast 6 symbols long" : null),
    },
  });

  const changeEmailForm = useForm({
    initialValues: {
      newEmail: "",
    },
    validate: (values) => ({
      newEmail:
        values.newEmail === ""
          ? "New email cant be empty"
          : values.newEmail === email
          ? "New and old emails are the same"
          : values.newEmail.indexOf("@") === -1
          ? "Email is incorrect"
          : null,
    }),
  });

  const createReauthModal = (callback: Function) => {
    setCallback(callback);
    setModal(true);
  };

  const changePassword = () => {
    setPasswordButtonLoading(true);
    if (user) {
      updatePassword(user, changePasswordForm.values.password)
        .then(() => {
          setPasswordButtonLoading(false);
          setPasswordButtonSuccess(true);
          setTimeout(() => {
            setPasswordButtonSuccess(false);
          }, 5000);
        })
        .catch((error: FirebaseError) => {
          error.code === "Reauth" && createReauthModal(changeEmail);
          console.log(error.message);
          console.log(error.code);
        });
    }
  };

  const changeEmail = () => {
    setEmailButtonLoading(true);
    if (user) {
      updateEmail(user, changeEmailForm.values.newEmail)
        .then(() => {
          setEmailButtonLoading(false);
          setEmailButtonSuccess(true);
          setTimeout(() => {
            setEmailButtonSuccess(false);
          }, 5000);
          setEmail(changeEmailForm.values.newEmail);
        })
        .catch((error: FirebaseError) => {
          error.code === "Reauth" && createReauthModal(changeEmail);
          console.log(error.message);
          console.log(error.code);
        });
    }
  };

  return (
    <>
      <Container size="lg" className="settings-main">
        <h2>Password</h2>
        <Card
          styles={{
            root: { padding: "0 !important", border: `1px solid ${theme.colors.dark[5]}` },
          }}
        >
          <form
            onSubmit={changePasswordForm.onSubmit((values) => {
              changePassword();
            })}
          >
            <SettingContainer>
              <PasswordInput
                label="New password"
                description="Minimum 6 characters including letters and numbers"
                {...changePasswordForm.getInputProps("password")}
              />
            </SettingContainer>
            <SettingContainer>
              <PasswordInput
                label="Confirm new password"
                {...changePasswordForm.getInputProps("confirmPassword")}
              />
            </SettingContainer>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  loading={passowrdButtonLoading}
                  size="sm"
                  type="submit"
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {passowrdButtonSuccess ? "Updated!" : "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </Card>
        <h2>Email and verification</h2>
        <Card
          styles={{
            root: { padding: "0 !important", border: `1px solid ${theme.colors.dark[5]}` },
          }}
        >
          <form
            onSubmit={changeEmailForm.onSubmit((values) => {
              changeEmail();
            })}
          >
            <SettingContainer>
              <TextInput label="Current email" disabled type="email" value={email} />
            </SettingContainer>
            <SettingContainer>
              <TextInput label="New Email" {...changeEmailForm.getInputProps("newEmail")} />
            </SettingContainer>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  type="submit"
                  loading={emailButtonLoading}
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {emailButtonSuccess ? "Updated!" : "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </Card>
      </Container>
      <ReauthModal callback={callback} modal={modal} setModal={setModal} />
    </>
  );
};
