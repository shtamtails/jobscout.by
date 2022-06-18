import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Container,
  Image,
  Modal,
  Tabs,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setUser } from "../store/reducers/userReducer";
import { getAdditionalUserInfo, getAuth, updateProfile } from "firebase/auth";
import { Trash } from "tabler-icons-react";

export const Settings: React.FC = ({}) => {
  const theme = useMantineTheme();
  const [dropdownModal, setDropdownModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { authorized, email, token, id, verified, image, username } = useAppSelector(
    (state) => state.user
  );
  const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const auth = getAuth();
  const user = auth.currentUser;

  const changeImage = () => {
    if (user) {
      updateProfile(user, {
        photoURL:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80",
      })
        .then(() => {
          console.log("photo updated");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const removeImage = () => {
    dispatch(
      setUser({
        authorized: authorized,
        email: email,
        token: token,
        id: id,
        verified: verified,
        image: undefined,
        username: username,
      })
    );
  };

  return (
    <>
      <Modal
        centered
        opened={dropdownModal}
        onClose={() => setDropdownModal(false)}
        title="Introduce yourself!"
      >
        Dropszone
      </Modal>
      <Container size="lg">
        <Title className="m-v-lg">Settings</Title>
        <Tabs>
          <Tabs.Tab label="General">
            <div className="m-t-md">
              <div style={{ width: "500px" }}>
                <Card shadow="sm" p="lg">
                  <div className="flex">
                    <Avatar color="blue" size="xl" radius="xl" src={image}>
                      {/* <Image src={image} /> */}
                      {/* <User size={42} /> */}
                    </Avatar>
                    <div className="profile-avatar-settings p-h-md flex-column jcse">
                      <div className="flex">
                        <Button
                          size="xs"
                          onClick={() => {
                            setDropdownModal(true);
                            changeImage();
                          }}
                        >
                          Update profile picture
                        </Button>
                        <ActionIcon styles={{ root: { marginLeft: "10px" } }} onClick={removeImage}>
                          <Trash />
                        </ActionIcon>
                      </div>
                      <Text size="sm" styles={{ root: { color: secondaryColor, lineHeight: 1.5 } }}>
                        Must be PNG or JPEG and cannot exceed 5MB
                      </Text>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="m-t-md">
              <TextInput
                placeholder="Username"
                label="Username"
                size="md"
                description="Minimum 4 characters long and should'nt contain any special symbols"
              />
            </div>
          </Tabs.Tab>
          <Tabs.Tab label="Security and Privacy">Security and Privacy</Tabs.Tab>
          <Tabs.Tab label="Interface">Interface</Tabs.Tab>
          <Tabs.Tab label="Notifications">Notifications</Tabs.Tab>
          <Tabs.Tab label="Other">Other</Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
};
