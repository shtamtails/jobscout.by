import { Container, Switch, Text } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";
import { SettingSection } from "../components/SettingSection";

export const SettingsNotifications: React.FC = () => {
  return (
    <Container size="lg" className="settings-main">
      <h2>Notifications</h2>
      <Text color="red">IN DEVELOPEMENT</Text>
      <SettingContainer>
        <SettingSection>
          <>
            <Switch label="Subscrbe to interesting posts and news" py="sm" />
            <Switch label="Notify me on suspicion activities on my account" py="sm" />
          </>
        </SettingSection>
      </SettingContainer>
    </Container>
  );
};
