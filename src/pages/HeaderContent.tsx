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
} from "tabler-icons-react";
import { Login } from "./Login";
import { removeUser, setAuthorization } from "../store/reducers/userReducer";
import { getAuth, signOut } from "firebase/auth";

export const HeaderContent: React.FC = () => {
  const [loginModal, setLoginModal] = useState(false);

  const { authorized, email, id, token } = useAppSelector((state) => state.user);
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
                <Avatar color="blue" size="md" radius="xl">
                  <User size={26} />
                </Avatar>
              </div>
            }
          >
            <Menu.Label>Account</Menu.Label>
            {authorized ? (
              <>
                <Menu.Item
                  icon={<User size={18} />}
                  onClick={() => {
                    console.log(authorized, email, id, token);
                  }}
                >
                  Profile
                </Menu.Item>
                <Menu.Item icon={<Settings size={18} />}>Settings</Menu.Item>
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
