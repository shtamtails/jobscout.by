import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  authorized: boolean;
}

const initialState: IUser = {
  authorized: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthorization: (state: IUser, action: PayloadAction<boolean>) => {
      state.authorized = action.payload;
    },
  },
});

export const { setAuthorization } = userReducer.actions;
