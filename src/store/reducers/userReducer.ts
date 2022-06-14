import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  authorized: boolean;
  email: string | null;
  token: string | null;
  id: string | null;
}

const initialState: IUser = {
  authorized: false,
  email: null,
  token: null,
  id: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthorization: (state: IUser, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
    setUser: (state: IUser, action: PayloadAction<IUser>) => {
      state.authorized = true;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    removeUser: (state: IUser) => {
      state.authorized = false;
      state.email = null;
      state.id = null;
      state.token = null;
    },
  },
});

export const { setAuthorization, setUser, removeUser } = userReducer.actions;
