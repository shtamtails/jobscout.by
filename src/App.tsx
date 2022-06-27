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
import { HeaderContent } from "./pages/HeaderContent";
import { ModalsProvider } from "@mantine/modals";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { removeUser, setTheme, setUser } from "./store/reducers/userReducer";
import { Settings } from "./pages/Settings";
import { NotificationsProvider } from "@mantine/notifications";
import { Retrieve } from "./pages/Retrieve";
import { database } from "./firebase";
import { onValue, ref } from "firebase/database";

function App() {
  const { theme } = useAppSelector((user) => user.user);
  const dispatch = useAppDispatch();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDatabaseRef = ref(database, `users/` + user.uid);
        onValue(userDatabaseRef, (snapshot) => {
          const data = snapshot.val();
          dispatch(setTheme(data.theme));
        });
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

  useEffect(() => {
    theme && setColorScheme(theme);
  }, [theme]);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

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
