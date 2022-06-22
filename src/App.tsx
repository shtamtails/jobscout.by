import { useEffect, useState } from "react";
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  Navbar,
} from "@mantine/core";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { HeaderContent } from "./pages/HeaderContent";
import { ModalsProvider } from "@mantine/modals";
import { getAuth, onAuthStateChanged, UserCredential } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { removeUser, setUser } from "./store/reducers/userReducer";
import { Settings } from "./pages/Settings";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const dispatch = useAppDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            authorized: true,
            email: user.email,
            id: user.uid,
            verified: user.emailVerified,
            username: user.displayName,
            image: user.photoURL,
          })
        );
      } else {
        dispatch(removeUser);
      }
    });
  }, [dispatch]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
          <NotificationsProvider>
            <AppShell
              padding="md"
              navbar={
                <Navbar width={{ base: 300 }} p="xs">
                  {/* Navbar content */}
                </Navbar>
              }
              header={
                <Header height={60}>
                  <HeaderContent />
                </Header>
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
            >
              <Routes>
                <Route path="Settings" element={<Settings />} />
              </Routes>
            </AppShell>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
