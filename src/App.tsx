import { useEffect, useState } from "react";
import { AppShell, ColorScheme, ColorSchemeProvider, Header, MantineProvider, Navbar } from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { HeaderContent } from "./pages/HeaderContent";
import { ModalsProvider } from "@mantine/modals";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { setTheme } from "./store/reducers/userReducer";
import { Settings } from "./pages/Settings/Settings";
import { NotificationsProvider } from "@mantine/notifications";
import { Retrieve } from "./pages/Actions/Retrieve";
import { initializeUser } from "./utils/initializeUser";
import { DB_UPDATE_USER } from "./utils/updateDatabase";
import { NavbarContent } from "./pages/NavbarContent";
import { Content } from "./pages/Content";

function App() {
  const { theme } = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    theme && setColorScheme(theme);
  }, [theme]);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light")); // update state
    DB_UPDATE_USER({ theme: theme === "light" ? "dark" : "light" });
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NotificationsProvider>
            <AppShell
              padding="md"
              navbar={
                <Navbar width={{ base: 300 }} p="xs">
                  <NavbarContent />
                </Navbar>
              }
              header={
                <Header height={60}>
                  <HeaderContent />
                </Header>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
            >
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="settings" element={<Settings />} />
                <Route path="/_/retrieve" element={<Retrieve />} />
              </Routes>
            </AppShell>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
