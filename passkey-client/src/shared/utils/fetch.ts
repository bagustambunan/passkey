import axios, { type AxiosRequestConfig } from "axios";

export const get = async <TRequest, TResponse>(
  requestConfig: AxiosRequestConfig & { params?: TRequest; data?: TRequest }
) => {
  const response = await axios.get<TResponse>(requestConfig.url || "", requestConfig);
  return response.data;
};

export const post = async <TRequest, TResponse>(
  requestConfig: AxiosRequestConfig & { params?: TRequest; data?: TRequest }
) => {
  const response = await axios.post<TResponse>(requestConfig.url || "", requestConfig);
  return response.data;
};