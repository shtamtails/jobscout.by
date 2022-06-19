import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Divider,
  Indicator,
  ListItem,
  Menu,
  Popover,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import {
  Sun,
  MoonStars,
  User,
  Settings,
  MessageCircle,
  Photo,
  Search,
  Trash,
  Language,
  DoorExit,
  DoorEnter,
  List,
} from "tabler-icons-react";
import { Login } from "./Login";
import { removeUser, setAuthorization } from "../store/reducers/userReducer";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export const HeaderContent: React.FC = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [accountTooltip, setAccountTooltip] = useState<boolean>(false);

  const { authorized, email, id, token, username, verified, image } = useAppSelector(
    (state) => state.user
  );

  const dispatch = useAppDispatch();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [searchValue, setSearchValue] = useState<string>("");
  const data =
    searchValue.trim().length > 0 && !searchValue.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${searchValue}@${provider}`)
      : [];

  return (
    <>
      {loginModal && <Login opened={loginModal} setOpened={setLoginModal} />}

      <header>
        <div className="app-logo">App</div>

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
                <Avatar color="blue" size="md" radius="xl" src={image}>
                  <User size={26} />
                </Avatar>
              </div>
            }
          >
            {authorized &&
              (username ? (
                <Menu.Item disabled>Hello, {username}!</Menu.Item>
              ) : (
                <Menu.Item disabled>Hello, anonymous!</Menu.Item>
              ))}
            <Menu.Label>Account</Menu.Label>
            {authorized ? (
              <>
                <Menu.Item icon={<User size={18} />}>Profile</Menu.Item>

                <Popover
                  opened={accountTooltip}
                  onClose={() => setAccountTooltip(false)}
                  position="bottom"
                  placement="center"
                  withArrow
                  trapFocus={false}
                  closeOnEscape={false}
                  transition="pop-top-left"
                  width={260}
                  styles={{ body: { pointerEvents: "none" }, root: { width: "100%" } }}
                  target={
                    <Indicator
                      position="middle-end"
                      offset={12}
                      color="red"
                      onMouseEnter={() => setAccountTooltip(true)}
                      onMouseLeave={() => setAccountTooltip(false)}
                    >
                      <Link to="/settings">
                        <Menu.Item icon={<Settings size={18} />}>Settings</Menu.Item>
                      </Link>
                    </Indicator>
                  }
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {!username && (
                      <Text size="sm" color="red">
                        Username is not defined
                      </Text>
                    )}
                    {!verified && (
                      <Text size="sm" color="red">
                        Email is not verified
                      </Text>
                    )}
                  </div>
                </Popover>
                <Link to="/settings"></Link>
                <Menu.Item icon={<Language size={18} />}>Language</Menu.Item>
                <Divider />
                <Menu.Item
                  color="red"
                  icon={<DoorExit size={18} />}
                  onClick={() => {
                    const auth = getAuth();
                    signOut(auth)
                      .then(() => {
                        dispatch(removeUser());
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                >
                  Log out
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item icon={<DoorEnter size={18} />} onClick={() => setLoginModal(true)}>
                  Log in
                </Menu.Item>
              </>
            )}
          </Menu>
        </div>
      </header>
    </>
  );
};
