import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Divider,
  Menu,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { useState } from "react";
import {
  Sun,
  MoonStars,
  User,
  Settings,
  MessageCircle,
  Photo,
  Search,
  Trash,
} from "tabler-icons-react";

export const HeaderContent: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [searchValue, setSearchValue] = useState<string>("");
  const data =
    searchValue.trim().length > 0 && !searchValue.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${searchValue}@${provider}`)
      : [];

  return (
    <header>
      <div className="app-logo">GBOT</div>

      <div className="app-actions">
        <Autocomplete
          icon={<Search size={16} />}
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search"
          data={data}
          radius="md"
        />
        <div className="header-action">
          <ActionIcon
            size="lg"
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size={24} /> : <MoonStars size={24} />}
          </ActionIcon>
        </div>

        <Menu
          control={
            <div className="header-action">
              <Avatar color="blue" size="md" radius="xl">
                <User size={26} />
              </Avatar>
            </div>
          }
        >
          <Menu.Label>Account</Menu.Label>
          <Menu.Item icon={<MessageCircle size={14} />}>Profile</Menu.Item>
          <Menu.Item icon={<Settings size={14} />}>Settings</Menu.Item>
          <Menu.Item icon={<Photo size={14} />}>Language</Menu.Item>
          <Divider />
          <Menu.Item color="red" icon={<Trash size={14} />}>
            Log out
          </Menu.Item>
        </Menu>
      </div>
    </header>
  );
};
