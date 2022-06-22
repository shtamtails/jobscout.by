import { Container, Switch, Text } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";
import { SettingSection } from "../components/SettingSection";

export const SettingsInterface: React.FC = () => {
  return (
    <Container size="lg" className="settings-main">
      <h2>Interface</h2>
      <Text color="red">IN DEVELOPEMENT</Text>
      <SettingContainer>
        <SettingSection>
          <>
            <Switch label="Use light theme as default" py="sm" />
            <Switch label="Hide navbar at launch" py="sm" />
          </>
        </SettingSection>
      </SettingContainer>
    </Container>
  );
};
