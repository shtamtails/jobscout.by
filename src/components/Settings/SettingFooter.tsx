import { Box } from "@mantine/core";
import { ISettings } from "interface/ISettings";
import React from "react";

export const SettingFooter: React.FC<ISettings> = ({ children }) => {
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
