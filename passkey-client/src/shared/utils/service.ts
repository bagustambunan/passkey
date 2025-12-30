import type { LoginRequest, LoginResponse } from "../constants/types";
import { post } from "./fetch";

export const login = async (username: string, password: string) => {
  const response = await post<LoginRequest, LoginResponse>({
    url: "http://localhost:3000/api/v1/auth/login",
    data: { username, password },
  });
  return response;
};
