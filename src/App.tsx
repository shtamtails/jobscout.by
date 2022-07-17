import { ColorScheme, ColorSchemeProvider, MantineProvider, AppShell, Navbar, Header } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import { Settings } from "pages/Settings/Settings";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "./hooks/redux";
import { Actions } from "./pages/Actions/Actions";
import { Content } from "./pages/Content";
import { HeaderContent } from "./pages/HeaderContent";
import { NavbarContent } from "./pages/NavbarContent";
import { setTheme } from "./store/reducers/userReducer";
import { initializeUser } from "./utils/initializeUser";
import { DB_UPDATE_USER } from "./utils/updateDatabase";

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
                <Route path="/_/actions" element={<Actions />} />
              </Routes>
            </AppShell>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
