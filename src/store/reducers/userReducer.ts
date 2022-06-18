import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  authorized: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
  verified?: boolean;
  image?: string | null;
  username?: string | null;
}

const initialState: IUser = {
  authorized: false,
  email: null,
  token: null,
  id: null,
  verified: false,
  image: null,
  username: null,
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
      state.token = action.payload.token;
      state.verified = action.payload?.verified;
      state.image = action.payload?.image;
      state.username = action.payload?.username;
    },
    removeUser: (state: IUser) => {
      state.authorized = false;
      state.email = null;
      state.id = null;
      state.token = null;
      state.verified = false;
      state.image = undefined;
      state.username = null;
    },
  },
});

export const { setAuthorization, setUser, removeUser } = userReducer.actions;
