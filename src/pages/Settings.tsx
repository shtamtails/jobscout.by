import { Container, Tabs, Title } from "@mantine/core";
import React from "react";
import { SettingsGeneral } from "./SettingsGeneral";
import { SettingsSecurity } from "./SettingsSecurity";
import { SettingsInterface } from "./SettingsInterface";
import { SettingsNotifications } from "./SettingsNotifications";

export const Settings: React.FC = ({}) => {
  return (
    <>
      <Container className="settings">
        <Title className="m-v-lg">Settings</Title>
        <Tabs>
          <Tabs.Tab label="General">
            <SettingsGeneral />
          </Tabs.Tab>
          <Tabs.Tab label="Security and Privacy">
            <SettingsSecurity />
          </Tabs.Tab>
          <Tabs.Tab label="Interface">
            <SettingsInterface />
          </Tabs.Tab>
          <Tabs.Tab label="Notifications">
            <SettingsNotifications />
          </Tabs.Tab>
          <Tabs.Tab label="Other">Other</Tabs.Tab>
        </Tabs>
      </Container>
    </>
  );
};
