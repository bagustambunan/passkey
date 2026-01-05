export type Profile = {
  name: string;
  photo: string;
};

export type Response<T> = {
  message?: string;
  data?: T;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = Response<undefined>;

export type GetUserResponse = Response<User>;

export type User = {
  username: string;
};

export type LogoutResponse = Response<undefined>;

export type StartPasskeyRegistrationResponse = Response<PublicKeyCredentialCreationOptionsJSON>;

export type FinishPasskeyRegistrationResponse = Response<undefined>;

export type Credential = Omit<PublicKeyCredential, "response"> & {
  response: AuthenticatorResponse & {
    attestationObject: ArrayBuffer;
  };
};

export type StringifiedCredential = {
  id: string;
  rawId: string;
  response: {
    clientDataJSON: string;
    attestationObject: string;
  };
  type: PublicKeyCredentialType;
};
