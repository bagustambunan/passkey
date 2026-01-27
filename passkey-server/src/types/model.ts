export type Authenticator = {
  credentialID: Uint8Array;
  credentialPublicKey: Uint8Array;
  counter: number;
  transports?: any[];
};

export type User = {
  name: string;
  username: string;
  password: string;
  currentChallenge?: string;
  authenticators?: Authenticator[];
};
