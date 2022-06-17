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
import { Trash, User } from "tabler-icons-react";

export const Settings: React.FC = ({}) => {
  const theme = useMantineTheme();
  const [dropdownModal, setDropdownModal] = useState<boolean>(false);

  const secondaryColor = theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <>
      <Modal
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
                    <Avatar color="blue" size="xl" radius="xl">
                      <User size={42} />
                    </Avatar>
                    <div className="profile-avatar-settings p-h-md flex-column jcse">
                      <div className="flex">
                        <Button size="xs">Update profile picture</Button>
                        <ActionIcon styles={{ root: { marginLeft: "10px" } }}>
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
