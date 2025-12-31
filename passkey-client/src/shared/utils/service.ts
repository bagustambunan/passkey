import type { GetUserResponse, LoginRequest, LoginResponse, LogoutResponse } from "../constants/types";
import { get, post } from "./fetch";

export const login = async (username: string, password: string) => {
  const response = await post<LoginRequest, LoginResponse>({
    url: "auth/login",
    data: { username, password },
  });
  return response;
};

export const getUser = async () => {
  const response = await get<null, GetUserResponse>({
    url: "auth/user",
  });
  return response;
};

export const logout = async () => {
  const response = await get<null, LogoutResponse>({
    url: "auth/logout",
  });
  return response;
};
