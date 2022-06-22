import { Box } from "@mantine/core";
import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface SettingsSection {
  children: ReactJSXElement;
}

export const SettingSection: React.FC<SettingsSection> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "16px",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#FFFFFF",
        minWidth: "100%",
        borderBottom: theme.colorScheme === "light" ? "" : `1px solid ${theme.colors.dark[4]}`,
        "&:last-child": {
          borderBottom: "none",
        },
      })}
    >
      {children}
    </Box>
  );
};
