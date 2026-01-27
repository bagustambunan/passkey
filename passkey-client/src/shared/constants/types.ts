export type Profile = {
  name: string;
  photo: string;
};

export type Response<T> = {
  message?: string;
  data?: T;
};

export type User = {
  name: string;
  username: string;
};