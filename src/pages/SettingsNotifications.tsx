import { Card, Container, Switch, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";

export const SettingsNotifications: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" className="settings-main">
      <h2>Notifications</h2>
      <Text color="red">IN DEVELOPEMENT</Text>
      <Card
        styles={{
          root: { padding: "0 !important", border: `1px solid ${theme.colors.dark[5]}` },
        }}
      >
        <SettingContainer>
          <>
            <Switch label="Subscrbe to interesting posts and news" py="sm" />
            <Switch label="Notify me on suspicion activities on my account" py="sm" />
          </>
        </SettingContainer>
      </Card>
    </Container>
  );
};
