import React from "react";
import { useAppSelector } from "./redux";

export const useAuth = () => {
  const { email, token, id, authorized } = useAppSelector((state) => state.user);
  return { authorized, email, token, id };
};
