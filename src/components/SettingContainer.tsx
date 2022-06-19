import { Box } from "@mantine/core";
import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface SettingsContainer {
  children: ReactJSXElement;
}

export const SettingContainer: React.FC<SettingsContainer> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "16px",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#FFFFFF",
        minWidth: "100%",
        borderBottom: `1px solid ${theme.colors.dark[5]}`,
      })}
    >
      {children}
    </Box>
  );
};
