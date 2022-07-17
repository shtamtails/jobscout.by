import { Button, Container, PasswordInput, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { getAuth, sendEmailVerification, updateEmail, updatePassword } from "firebase/auth";
import { Check, Lock, Mail, Send } from "tabler-icons-react";
import { FirebaseError } from "firebase/app";
import { showNotification } from "@mantine/notifications";
import { ReauthModal } from "components/ReauthModal";
import { SettingContainer } from "components/Settings/SettingContainer";
import { SettingFooter } from "components/Settings/SettingFooter";
import { SettingSection } from "components/Settings/SettingSection";
import { useAppSelector, useAppDispatch } from "hooks/redux";
import { setEmail } from "store/reducers/userReducer";
import { DB_UPDATE_USER } from "utils/updateDatabase";

export const SettingsSecurity: React.FC = () => {
  const { email } = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const theme = useMantineTheme();

  const [newEmail, setNewEmail] = useState<string | null>(email);
  const [reAuthModal, setReAuthModal] = useState<boolean>(false);
  const [callback, setCallback] = useState<string | null>(null);
  const [pwdBtnState, setPwnBtnState] = useState<string | null>(null);
  const [emailBtnState, setEmailBtnState] = useState<string | null>(null);

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
    const password = changePasswordForm.values.password;
    setPwnBtnState("loading");
    if (user) {
      updatePassword(user, password)
        .then(() => {
          setPwnBtnState("success");
          setTimeout(() => {
            setPwnBtnState(null);
          }, 3000);
        })
        .catch((error: FirebaseError) => {
          // * if firebase fouce us to re-auth => display modal with
          // * password input and callback changePassword()

          switch (error.code) {
            case "auth/requires-recent-login":
              setCallback("password");
              setReAuthModal(true);
              break;
          }
        });
    }
  };

  const changeEmail = () => {
    const email = changeEmailForm.values.newEmail;
    setEmailBtnState("loading");
    if (user) {
      updateEmail(user, email)
        .then(() => {
          DB_UPDATE_USER({ email: email }); // update db
          dispatch(setEmail(email)); // update global states
          setNewEmail(email); // update local state

          setEmailBtnState("success");
          setTimeout(() => {
            setEmailBtnState(null);
          }, 3000);
        })
        .catch((error: FirebaseError) => {
          // * if firebase fouce us to re-auth => display modal with
          // * password input and callback changeEmail()

          switch (error.code) {
            case "auth/requires-recent-login":
              setCallback("email");
              setReAuthModal(true);
              break;
          }
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
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[8],
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
                icon={<Lock size={20} />}
              />
            </SettingSection>
            <SettingSection>
              <PasswordInput
                label="Confirm new password"
                {...changePasswordForm.getInputProps("confirmPassword")}
                icon={<Lock size={20} />}
              />
            </SettingSection>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  loading={pwdBtnState === "loading"}
                  size="sm"
                  type="submit"
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {pwdBtnState === "loading" && ""}
                  {pwdBtnState === "success" && <Check />}
                  {pwdBtnState === null && "Update"}
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
                  <Button variant={theme.colorScheme === "dark" ? "light" : "filled"} onClick={sendVerificationEmail}>
                    Verify Email
                  </Button>
                  <Text pl="sm">You have to verify your email address to access certain features</Text>
                </div>
              </SettingSection>
            )}

            <SettingSection>
              <TextInput
                label="Current email"
                disabled
                type="email"
                value={newEmail ? newEmail : ""}
                icon={<Mail size={20} color="grey" />}
              />
            </SettingSection>
            <SettingSection>
              <TextInput label="New Email" {...changeEmailForm.getInputProps("newEmail")} icon={<Mail size={20} />} />
            </SettingSection>
            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  type="submit"
                  loading={emailBtnState === "loading"}
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                >
                  {emailBtnState === "loading" && ""}
                  {emailBtnState === "success" && <Check />}
                  {emailBtnState === null && "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </SettingContainer>
      </Container>
      {callback === "password" && (
        <ReauthModal callback={changePassword} modal={reAuthModal} setModal={setReAuthModal} />
      )}
      {callback === "email" && <ReauthModal callback={changeEmail} modal={reAuthModal} setModal={setReAuthModal} />}
    </>
  );
};
