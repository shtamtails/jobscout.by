import { ColorScheme } from "@mantine/core";

export interface IUser {
  authorized: boolean;
  email: string | null;
  id: string | null;
  verified: boolean;
  image?: string | null;
  username?: string | null;
  theme?: ColorScheme;
  language?: string;
}
