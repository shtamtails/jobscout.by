import React from "react";
import { Card } from "@mantine/core";
import { ISettings } from "../../interface/ISettings";

export const SettingContainer: React.FC<ISettings> = ({ children }) => {
  return <Card styles={{ root: { padding: `0 !important` } }}>{children}</Card>;
};
