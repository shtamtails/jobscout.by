import { ColorScheme } from "@mantine/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  authorized: boolean;
  email: string | null;
  id: string | null;
  verified?: boolean;
  image?: string | null;
  username?: string | null;
  defaultTheme?: ColorScheme;
}

const initialState: IUser = {
  authorized: false,
  email: null,
  id: null,
  verified: false,
  image: null,
  username: null,
  defaultTheme: "dark",
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthorization: (state: IUser, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      state.authorized = action.payload.authorized;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.verified = action.payload?.verified;
      state.image = action.payload?.image;
      state.username = action.payload?.username;
    },
    removeUser: (state: IUser) => {
      state.authorized = false;
      state.email = null;
      state.id = null;
      state.verified = false;
      state.image = undefined;
      state.username = null;
    },
    setEmail: (state: IUser, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setImage: (state: IUser, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    setUsername: (state: IUser, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setVerified: (state: IUser, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
    setDefaultTheme: (state: IUser, action: PayloadAction<ColorScheme>) => {
      state.defaultTheme = action.payload;
    },
  },
});

export const {
  setAuthorization,
  setUser,
  removeUser,
  setEmail,
  setImage,
  setUsername,
  setVerified,
  setDefaultTheme,
} = userReducer.actions;
