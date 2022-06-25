import { Button, Container, PasswordInput, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { SettingSection } from "../components/SettingSection";
import { SettingFooter } from "../components/SettingFooter";
import { getAuth, sendEmailVerification, updateEmail, updatePassword } from "firebase/auth";
import { Send } from "tabler-icons-react";
import { FirebaseError } from "firebase/app";
import { ReauthModal } from "../components/ReauthModal";
import { useEffect } from "react";
import { showNotification } from "@mantine/notifications";
import { SettingContainer } from "../components/SettingContainer";
import { useAppDispatch } from "../hooks/redux";
import { setEmail } from "../store/reducers/userReducer";

export const SettingsSecurity: React.FC = () => {
  const theme = useMantineTheme();
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useAppDispatch();

  const [newEmail, setNewEmail] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
      setNewEmail(user.email);
    }
  }, [user?.email]);

  const [modal, setModal] = useState<boolean>(false);
  const [callback, setCallback] = useState<string | null>(null);

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

  const changeEmailForm = useForm({
    initialValues: {
      newEmail: "",
    },
    validate: (values) => ({
      newEmail:
        values.newEmail === ""
          ? "New email cant be empty"
          : values.newEmail === newEmail
          ? "New and old emails are the same"
          : values.newEmail.indexOf("@") === -1
          ? "Email is incorrect"
          : null,
    }),
  });

  const changePassword = () => {
    setPasswordButtonLoading(true);
    if (user) {
      updatePassword(user, changePasswordForm.values.password)
        .then(() => {
          console.log("password changed");
          setPasswordButtonLoading(false);
          setPasswordButtonSuccess(true);
          setTimeout(() => {
            setPasswordButtonSuccess(false);
          }, 5000);
        })
        .catch((error: FirebaseError) => {
          error.code === "auth/requires-recent-login" && setCallback("password");
          setModal(true);
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
          setNewEmail(changeEmailForm.values.newEmail);
          dispatch(setEmail(changeEmailForm.values.newEmail));
        })
        .catch((error: FirebaseError) => {
          error.code === "auth/requires-recent-login" && setCallback("email");
          setModal(true);
          console.log(error.code);
        });
    }
  };

  const sendVerificationEmail = () => {
    if (user) {
      sendEmailVerification(user).then(() => {
        showNotification({
          title: "Email verification",
          message: "Verification message was sent. Please, check your inbox.",
          icon: <Send size={16} />,
          radius: "md",
          sx: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[8],
          },
        });
      });
    }
  };

  return (
    <>
      <Container size="lg" className="settings-main">
        <h2>Password</h2>
        <SettingContainer>
          <form
            onSubmit={changePasswordForm.onSubmit((values) => {
              changePassword();
            })}
          >
            <SettingSection>
              <PasswordInput
                label="New password"
                description="Minimum 6 characters including letters and numbers"
                {...changePasswordForm.getInputProps("password")}
              />
            </SettingSection>
            <SettingSection>
              <PasswordInput
                label="Confirm new password"
                {...changePasswordForm.getInputProps("confirmPassword")}
              />
            </SettingSection>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  loading={passowrdButtonLoading}
                  size="sm"
                  type="submit"
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {passowrdButtonLoading ? "" : passowrdButtonSuccess ? "Updated!" : "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </SettingContainer>

        <h2>Email and verification</h2>
        <SettingContainer>
          <form
            onSubmit={changeEmailForm.onSubmit((values) => {
              changeEmail();
            })}
          >
            {!user?.emailVerified && (
              <SettingSection>
                <div className="flex aic">
                  <Button
                    variant={theme.colorScheme === "dark" ? "light" : "filled"}
                    onClick={sendVerificationEmail}
                  >
                    Verify Email
                  </Button>
                  <Text pl="sm">
                    You have to verify your email address to access certain features
                  </Text>
                </div>
              </SettingSection>
            )}

            <SettingSection>
              <TextInput label="Current email" disabled type="email" value={newEmail} />
            </SettingSection>
            <SettingSection>
              <TextInput label="New Email" {...changeEmailForm.getInputProps("newEmail")} />
            </SettingSection>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  type="submit"
                  loading={emailButtonLoading}
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {emailButtonLoading ? "" : emailButtonSuccess ? "Updated!" : "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </SettingContainer>
      </Container>
      {callback === "password" && (
        <ReauthModal callback={changePassword} modal={modal} setModal={setModal} />
      )}
      {callback === "email" && (
        <ReauthModal callback={changeEmail} modal={modal} setModal={setModal} />
      )}
    </>
  );
};
