import { Container, Switch, Text } from "@mantine/core";
import React from "react";
import { SettingContainer } from "../components/SettingContainer";
import { SettingSection } from "../components/SettingSection";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setTheme } from "../store/reducers/userReducer";
import { useState } from "react";
import { ref, set } from "firebase/database";
import { database } from "../firebase";

export const SettingsInterface: React.FC = () => {
  const { email, verified, image, theme, id, username } = useAppSelector((user) => user.user);
  const [defaultTheme, setDefaultTheme] = useState<boolean>(theme === "light" ? true : false);
  const dispatch = useAppDispatch();

  const changeDefaultTheme = () => {
    set(ref(database, "users/" + id), {
      id: id,
      username: username,
      email: email,
      verified: verified,
      image: image,
      theme: theme === "light" ? "dark" : "light",
    });
    setDefaultTheme(!defaultTheme);
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
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
              checked={defaultTheme}
              onChange={changeDefaultTheme}
            />
            <Switch label="Hide navbar at launch" py="sm" />
          </>
        </SettingSection>
      </SettingContainer>
    </Container>
  );
};
