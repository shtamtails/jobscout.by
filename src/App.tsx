import { useState } from "react";
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

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <ModalsProvider>
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
              <Route path="login" element={<Login />} />
            </Routes>
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
