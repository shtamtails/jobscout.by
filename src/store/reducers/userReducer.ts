import { ColorScheme } from "@mantine/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { ref, update } from "firebase/database";
import { database } from "../../firebase";

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

const initialState: IUser = {
  authorized: false,
  email: null,
  id: null,
  verified: false,
  image: null,
  username: null,
  theme: "dark",
  language: "English",
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
      state.theme = action.payload?.theme;
      state.language = action.payload.language;
    },
    removeUser: (state: IUser) => {
      state.authorized = false;
      state.email = null;
      state.id = null;
      state.verified = false;
      state.image = null;
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
    setTheme: (state: IUser, action: PayloadAction<ColorScheme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state: IUser, action: PayloadAction<string>) => {
      state.language = action.payload;
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
  setTheme,
  setLanguage,
} = userReducer.actions;
