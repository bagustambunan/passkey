export type User = {
  username: string;
  password: string;
};

export type Credential = Omit<PublicKeyCredential, 'response'> & {
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
  transports?: string[];
};

export type AuthenticationCredential = {
  id: string;
  response: AuthenticatorResponse & {
    authenticatorData: string;
    clientDataJSON: string;
    signature: string;
  };
};
