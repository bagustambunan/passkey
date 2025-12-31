import axios, { type AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

export const get = async <TRequest, TResponse>(
  requestConfig: AxiosRequestConfig & { data?: TRequest }
) => {
  const response = await instance.get<TResponse>(requestConfig.url || "", requestConfig);
  return response.data;
};

export const post = async <TRequest, TResponse>(
  requestConfig: AxiosRequestConfig & { data?: TRequest }
) => {
  const response = await instance.post<TResponse>(requestConfig.url || "", requestConfig.data);
  return response.data;
};