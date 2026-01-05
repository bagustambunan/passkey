import type {
  FinishPasskeyRegistrationResponse,
  GetUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  StartPasskeyRegistrationResponse,
  StringifiedCredential,
} from "../constants/types";
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

export const startPasskeyRegistration = async () => {
  const response = await get<null, StartPasskeyRegistrationResponse>({
    url: "passkey/register/start",
  });
  return response;
};

export const finishPasskeyRegistration = async (
  credential: StringifiedCredential
) => {
  const response = await post<
    StringifiedCredential,
    FinishPasskeyRegistrationResponse
  >({
    url: "passkey/register/finish",
    data: credential,
  });
  return response;
};
