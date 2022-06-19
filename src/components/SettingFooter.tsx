import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Box } from "@mantine/core";
import React from "react";

interface SettingsFooter {
  children: ReactJSXElement;
}

export const SettingFooter: React.FC<SettingsFooter> = ({ children }) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "16px",
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
      })}
    >
      {children}
    </Box>
  );
};
