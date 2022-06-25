import { Container, Switch, Text } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";
import { SettingSection } from "../components/SettingSection";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setDefaultTheme } from "../store/reducers/userReducer";
import { useState } from "react";

export const SettingsInterface: React.FC = () => {
  const { defaultTheme } = useAppSelector((user) => user.user);
  const [theme, setTheme] = useState<boolean>(defaultTheme === "light" ? true : false);
  const dispatch = useAppDispatch();

  const changeDefaultTheme = () => {
    setTheme(!theme);
    dispatch(setDefaultTheme(defaultTheme === "light" ? "dark" : "light"));
  };

  return (
    <Container size="lg" className="settings-main">
      <h2>Interface</h2>
      <Text color="red">IN DEVELOPEMENT</Text>
      <SettingContainer>
        <SettingSection>
          <>
            <Switch
              label="Use light theme as default"
              py="sm"
              checked={theme}
              onChange={changeDefaultTheme}
            />
            <Switch label="Hide navbar at launch" py="sm" />
          </>
        </SettingSection>
      </SettingContainer>
    </Container>
  );
};
