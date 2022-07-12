import { Text } from "@mantine/core";
import React from "react";

interface INavbarLink {
  children: String;
}

export const NavbarLink: React.FC<INavbarLink> = ({ children }) => {
  return (
    <Text
      className="navbar-link"
      sx={(theme) => ({
        "&:hover": {
          backgroundColor: "#2c2e33",
        },
      })}
    >
      {children}
    </Text>
  );
};
