import {
  ActionIcon,
  Autocomplete,
  Avatar,
  Button,
  Divider,
  Indicator,
  Menu,
  Modal,
  Popover,
  Select,
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
  Search,
  Language,
  DoorExit,
  DoorEnter,
  BrandReactNative,
} from "tabler-icons-react";
import { Login } from "./Login";
import { removeUser, setLanguage } from "../store/reducers/userReducer";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { DB_UPDATE_USER } from "utils/updateDatabase";

export const HeaderContent: React.FC = () => {
  const { authorized, username, verified, image, language } = useAppSelector((state) => state.user);

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [languageModal, setLanguageModal] = useState<boolean>(false);
  const [appLanguage, setAppLanguage] = useState<string | null>(language ? language : null);
  const [accountTooltip, setAccountTooltip] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [searchValue, setSearchValue] = useState<string>("");
  const data =
    searchValue.trim().length > 0 && !searchValue.includes("@")
      ? ["gmail.com", "outlook.com", "yahoo.com"].map((provider) => `${searchValue}@${provider}`)
      : [];

  const changeLanguage = () => {
    if (appLanguage !== null) {
      dispatch(setLanguage(appLanguage));
      DB_UPDATE_USER({ language: appLanguage });
    }
  };

  return (
    <>
      {loginModal && <Login opened={loginModal} setOpened={setLoginModal} />}
      <Modal opened={languageModal} onClose={() => setLanguageModal(false)} title="Change language">
        <>
          <Select
            placeholder="Language"
            data={[
              { value: "EN", label: "English" },
              { value: "RU", label: "Русский" },
              { value: "UA", label: "Український" },
            ]}
            value={appLanguage}
            onChange={setAppLanguage}
          />
          <Button fullWidth mt="lg" variant="light" onClick={() => appLanguage !== null && changeLanguage()}>
            Save
          </Button>
        </>
      </Modal>

      <header>
        <Link to="/">
          <div className="app-logo">
            <BrandReactNative size={36} />
            <Text pl="xs" size="xl" style={{ fontWeight: "800" }}>
              FOOBARBAZ
            </Text>
          </div>
        </Link>

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
                  withArrow
                  width={260}
                  styles={{ body: { pointerEvents: "none" }, root: { width: "100%" } }}
                  target={
                    <>
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
                    </>
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
                <Menu.Item icon={<Language size={18} />} onClick={() => setLanguageModal(true)}>
                  Language
                </Menu.Item>
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
