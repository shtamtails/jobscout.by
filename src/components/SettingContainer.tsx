import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Card } from "@mantine/core";

interface SettingsContainer {
  children: ReactJSXElement;
}

export const SettingContainer: React.FC<SettingsContainer> = ({ children }) => {
  return <Card styles={{ root: { padding: `0 !important` } }}>{children}</Card>;
};
