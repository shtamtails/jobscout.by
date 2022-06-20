import {
  Avatar,
  Card,
  Button,
  ActionIcon,
  TextInput,
  Text,
  Modal,
  useMantineTheme,
  Box,
} from "@mantine/core";
import React from "react";
import { User, Trash } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAuth, updateProfile } from "firebase/auth";
import { setUser } from "../store/reducers/userReducer";
import { useState, useEffect } from "react";
import { Container } from "@mantine/core";
import { SettingFooter } from "../components/SettingFooter";
import { SettingContainer } from "../components/SettingContainer";
import { useForm } from "@mantine/form";

export const SettingsGeneral: React.FC = () => {
  const [dropdownModal, setDropdownModal] = useState<boolean>(false);

  const [profilePictureButtonLoading, setProfilePictureButtonLoading] = useState<boolean>(false);
  const [profilePictureButtonSuccess, setProfilePictureButtonSuccess] = useState<boolean>(false);

  const [profileSettingsButtonLoading, setProfileSettingsButtonLoading] = useState<boolean>(false);
  const [profileSettingsButtonSuccess, setProfileSettingsButtonSuccess] = useState<boolean>(false);

  const { authorized, email, token, id, verified, image, username } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const changeImage = () => {
    setProfilePictureButtonLoading(true);
    if (user) {
      updateProfile(user, {
        photoURL:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      })
        .then(() => {
          setProfilePictureButtonLoading(false);
          setProfilePictureButtonSuccess(true);
          dispatch(
            setUser({
              authorized: authorized,
              email: email,
              token: token,
              id: id,
              verified: verified,
              image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
              username: username,
            })
          );
          setTimeout(() => {
            setProfilePictureButtonSuccess(false);
          }, 5000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const removeImage = () => {
    if (user) {
      updateProfile(user, {
        photoURL: "",
      })
        .then(() => {
          dispatch(
            setUser({
              authorized: authorized,
              email: email,
              token: token,
              id: id,
              verified: verified,
              image: null,
              username: username,
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const usernameForm = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) =>
        value.length < 4 ? "Username should be minimum 4 characters long" : null,
    },
  });

  const changeUsername = () => {
    setProfileSettingsButtonLoading(true);

    if (user) {
      updateProfile(user, {
        displayName: usernameForm.values.username,
      })
        .then(() => {
          setProfileSettingsButtonLoading(false);
          setProfileSettingsButtonSuccess(true);
          dispatch(
            setUser({
              authorized: authorized,
              email: email,
              token: token,
              id: id,
              verified: verified,
              image: image,
              username: usernameForm.values.username,
            })
          );
          setTimeout(() => {
            setProfileSettingsButtonSuccess(false);
          }, 5000);
          console.log("updated");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <>
      <Container size="lg" className="settings-main">
        <div className="m-t-md">
          <h2>Profile Image</h2>
          <Card shadow="sm" p="lg">
            <div className="flex">
              <Avatar color="blue" size="xl" radius="xl" src={image}>
                <User size={42} />
              </Avatar>
              <div className="profile-avatar-settings p-h-md flex-column jcse">
                <div className="flex aic">
                  <Button
                    loading={profilePictureButtonLoading}
                    size="sm"
                    variant="light"
                    onClick={() => {
                      setDropdownModal(true);
                      changeImage();
                    }}
                  >
                    {profilePictureButtonSuccess ? "Updated!" : "Update profile picture"}
                  </Button>
                  <ActionIcon styles={{ root: { marginLeft: "10px" } }} onClick={removeImage}>
                    <Trash size={24} />
                  </ActionIcon>
                </div>
                <Text size="sm" styles={{ root: { color: secondaryColor, lineHeight: 1.5 } }}>
                  Must be PNG or JPEG and cannot exceed 5MB
                </Text>
              </div>
            </div>
          </Card>
        </div>
        <h2>Profile Settings</h2>
        <Card
          styles={{
            root: { padding: "0 !important", border: `1px solid ${theme.colors.dark[5]}` },
          }}
        >
          <form
            onSubmit={usernameForm.onSubmit((values) => {
              changeUsername();
            })}
          >
            <SettingContainer>
              <TextInput
                className="m-v-sm"
                placeholder={username ? username : "Username"}
                label="Username"
                size="md"
                description="Minimum 4 characters long and should not contain any special symbols"
                {...usernameForm.getInputProps("username")}
              />
            </SettingContainer>

            <SettingFooter>
              <div className="flex jcfe">
                <Button
                  size="sm"
                  loading={profileSettingsButtonLoading}
                  type="submit"
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                  styles={{ root: { width: "100px" } }}
                >
                  {profileSettingsButtonSuccess ? "Updated!" : "Update"}
                </Button>
              </div>
            </SettingFooter>
          </form>
        </Card>
      </Container>

      <Modal
        centered
        opened={dropdownModal}
        onClose={() => setDropdownModal(false)}
        title="Introduce yourself!"
      >
        Dropszone
      </Modal>
    </>
  );
};
