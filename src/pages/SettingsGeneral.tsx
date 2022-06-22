import {
  Avatar,
  Card,
  Button,
  ActionIcon,
  TextInput,
  Text,
  Modal,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import { User, Trash } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAuth, updateProfile } from "firebase/auth";
import { setUser } from "../store/reducers/userReducer";
import { useState } from "react";
import { Container } from "@mantine/core";
import { SettingFooter } from "../components/SettingFooter";
import { SettingSection } from "../components/SettingSection";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "../components/DropzoneSettings";

import { firebaseDelete, firebaseUpload } from "../hooks/firebase";
import { SettingContainer } from "../components/SettingContainer";

export const SettingsGeneral: React.FC = () => {
  const [dropdownModal, setDropdownModal] = useState<boolean>(false);

  const [profilePictureButtonLoading, setProfilePictureButtonLoading] = useState<boolean>(false);
  const [profilePictureButtonSuccess, setProfilePictureButtonSuccess] = useState<boolean>(false);

  const [profileSettingsButtonLoading, setProfileSettingsButtonLoading] = useState<boolean>(false);
  const [profileSettingsButtonSuccess, setProfileSettingsButtonSuccess] = useState<boolean>(false);

  const { authorized, email, id, verified, image, username } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;

  const uploadImage = (file: File) => {
    const metadata = {
      contentType: `image/jpeg` || `image/jpg` || `image/png`,
    };
    firebaseUpload(file, `profilePhotos/${user?.uid}_avatar`, metadata, changeImage);
  };

  const changeImage = (imageURL: string) => {
    setDropdownModal(false);
    setProfilePictureButtonLoading(true);
    if (user) {
      updateProfile(user, {
        photoURL: `${imageURL}`,
      })
        .then(() => {
          setProfilePictureButtonLoading(false);
          setProfilePictureButtonSuccess(true);
          dispatch(
            setUser({
              authorized: authorized,
              email: email,
              id: id,
              verified: verified,
              image: user.photoURL,
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
          firebaseDelete(`profilePhotos/${user?.uid}_avatar`);
          dispatch(
            setUser({
              authorized: authorized,
              email: email,
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
      username: ``,
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
        <SettingContainer>
          <form
            onSubmit={usernameForm.onSubmit((values) => {
              changeUsername();
            })}
          >
            <SettingSection>
              <TextInput
                className="m-v-sm"
                label="Username"
                placeholder={username ? username : ""}
                size="md"
                description="Minimum 4 characters long and should not contain any special symbols"
                {...usernameForm.getInputProps("username")}
              />
            </SettingSection>

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
        </SettingContainer>
      </Container>

      <Modal
        size="xl"
        centered
        opened={dropdownModal}
        onClose={() => setDropdownModal(false)}
        title="Upload an image"
      >
        <Dropzone
          multiple={false}
          onDrop={(files) => uploadImage(files[0])}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      </Modal>
    </>
  );
};
