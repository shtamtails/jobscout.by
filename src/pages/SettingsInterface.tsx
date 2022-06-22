import { Card, Container, Switch, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";

export const SettingsInterface: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Container size="lg" className="settings-main">
      <h2>Interface</h2>
      <Text color="red">IN DEVELOPEMENT</Text>
      <Card
        styles={{
          root: { padding: "0 !important", border: `1px solid ${theme.colors.dark[5]}` },
        }}
      >
        <SettingContainer>
          <>
            <Switch label="Use light theme as default" py="sm" />
            <Switch label="Hide navbar at launch" py="sm" />
          </>
        </SettingContainer>
      </Card>
    </Container>
  );
};
