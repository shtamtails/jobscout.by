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
import { User, Trash, Check } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getAuth, updateProfile } from "firebase/auth";
import { setImage, setUsername } from "../store/reducers/userReducer";
import { useState } from "react";
import { Container } from "@mantine/core";
import { SettingFooter } from "../components/SettingFooter";
import { SettingSection } from "../components/SettingSection";
import { useForm } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { dropzoneChildren } from "../components/DropzoneSettings";
import { firebaseDelete, firebaseUpload } from "../hooks/firebase";
import { SettingContainer } from "../components/SettingContainer";
import { DB_UPDATE_USER } from "../utils/updateDatabase";

export const SettingsGeneral: React.FC = () => {
  const { image, username } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const user = auth.currentUser;
  const theme = useMantineTheme();

  const [dropdownModal, setDropdownModal] = useState<boolean>(false);
  const [photoBtnState, setPhotoBtnState] = useState<string | null>(null);
  const [usernameBtnState, setUsernameBtnState] = useState<string | null>(null);

  const uploadImage = (file: File) => {
    firebaseUpload({
      file: file,
      path: `profilePhotos/${user?.uid}_avatar`,
      metadata: {
        contentType: `image/jpeg` || `image/jpg` || `image/png`,
      },
      callback: changeImage,
    });
  };

  const changeImage = (imageURL: string) => {
    setDropdownModal(false);
    setPhotoBtnState("loading");
    if (user) {
      updateProfile(user, {
        photoURL: `${imageURL}`,
      })
        .then(() => {
          DB_UPDATE_USER({ image: `${imageURL}` });
          setPhotoBtnState("success");
          dispatch(setImage(imageURL));
          setTimeout(() => {
            setPhotoBtnState(null);
          }, 3000);
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
          DB_UPDATE_USER({ image: "" });
          firebaseDelete({ path: `profilePhotos/${user?.uid}_avatar` });
          dispatch(setImage(null));
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
    setUsernameBtnState("loading");
    const username = usernameForm.values.username;
    if (user) {
      updateProfile(user, {
        displayName: username,
      })
        .then(() => {
          DB_UPDATE_USER({ username: username });
          setUsernameBtnState("success");
          dispatch(setUsername(username));
          setTimeout(() => {
            setUsernameBtnState(null);
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
                    loading={photoBtnState === "loading"}
                    size="sm"
                    variant="light"
                    onClick={() => {
                      setDropdownModal(true);
                    }}
                  >
                    {photoBtnState === "loading" && ""}
                    {photoBtnState === "success" && <Check />}
                    {photoBtnState === null && "Update profile picture"}
                  </Button>
                  <ActionIcon styles={{ root: { marginLeft: "10px" } }} onClick={removeImage}>
                    <Trash size={24} />
                  </ActionIcon>
                </div>
                <Text
                  size="sm"
                  styles={{
                    root: {
                      color:
                        theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
                      lineHeight: 1.5,
                    },
                  }}
                >
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
                  loading={usernameBtnState === "loading"}
                  type="submit"
                  variant={theme.colorScheme === "dark" ? "light" : "filled"}
                  styles={{ root: { width: "100px" } }}
                >
                  {usernameBtnState === "loading" && ""}
                  {usernameBtnState === "success" && <Check />}
                  {usernameBtnState === null && "Update"}
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
