import type { Response, User } from "../constants/types";
import { get, post } from "./fetch";

export const login = async (username: string, password: string) => {
  const response = await post<{ username: string; password: string }, Response<null>>({
    url: '/auth/login',
    data: { username, password },
  });
  return response;
};

export const getUser = async () => {
  const response = await get<void, Response<User>>({
    url: '/auth/user',
  });
  return response;
};

export const logout = async () => {
  const response = await get<void, Response<null>>({
    url: '/auth/logout',
  });
  return response;
};

export const registerPasskeyStart = async () => {
  const response = await get<void, Response<any>>({
    url: '/passkey/register-start',
  });
  return response;
};

export const registerPasskeyFinish = async (attResp: any) => {
  const response = await post<any, Response<null>>({
    url: '/passkey/register-finish',
    data: attResp,
  });
  return response;
};

export const loginPasskeyStart = async (username: string) => {
  const response = await post<{ username: string }, Response<any>>({
    url: '/passkey/login-start',
    data: { username },
  });
  return response;
};

export const loginPasskeyFinish = async (username: string, asseResp: any) => {
  const response = await post<any, Response<null>>({
    url: '/passkey/login-finish',
    data: { ...asseResp, username },
  });
  return response;
};
