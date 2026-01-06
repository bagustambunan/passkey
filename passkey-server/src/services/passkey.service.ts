import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { StringifiedCredential } from '../types/model';

const rpID = 'localhost';
const rpName = 'Passkey Demo App';
const origin = 'http://localhost:5173';

const challenges = new Map<string, string>();

// Storage for credentials
const userCredentials = new Map<string, any[]>();

export const generatePasskeyRegistrationOptions = async (username: string) => {
  // Check if user already has a pending challenge
  if (challenges.has(username)) {
    throw new Error('Registration already in progress for this user');
  }

  // Generate options with @simplewebauthn/server
  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userID: username,
    userName: username,
    userDisplayName: username,
    attestationType: 'direct',
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
    },
  });

  // Save challenge for verification later
  challenges.set(username, options.challenge);

  return options;
};

export const verifyPasskeyRegistration = async (
  username: string,
  stringifiedCredential: StringifiedCredential
) => {
  // if (userCredentials.has(username)) {
  //   throw new Error('User already has a passkey registered');
  // }

  // 1. Get challenge that was saved previously
  const expectedChallenge = challenges.get(username);
  if (!expectedChallenge) {
    throw new Error('No registration challenge found for user');
  }

  // 2. Delete challenge after use (one-time use)
  challenges.delete(username);

  // 3. Verify credential with @simplewebauthn/server
  const verification = await verifyRegistrationResponse({
    response: stringifiedCredential,
    expectedChallenge,
    expectedOrigin: origin,
    expectedRPID: rpID,
  });

  // 4. Verify that the verification was successful
  if (!verification.verified) {
    throw new Error('Passkey registration verification failed');
  }

  // 5. Verify that registrationInfo is available
  if (!verification.registrationInfo) {
    throw new Error('Registration info not available');
  }

  // 6. Save credential to storage
  const newCredential = {
    id: Buffer.from(verification.registrationInfo.credentialID).toString(
      'base64url'
    ),
    publicKey: verification.registrationInfo.credentialPublicKey,
    counter: verification.registrationInfo.counter,
    backedUp: verification.registrationInfo.credentialBackedUp || false,
    transports: stringifiedCredential.transports || [],
  };

  // 7. Save to user credentials
  const existingCredentials = userCredentials.get(username) || [];
  existingCredentials.push(newCredential);
  userCredentials.set(username, existingCredentials);

  return { verified: true };
};

export const generatePasskeyAuthenticationOptions = async (
  username: string
) => {
  // 1. Get user's registered credentials
  const userCredentialsList = userCredentials.get(username) || [];

  // 2. Check if user has any passkeys
  if (userCredentialsList.length === 0) {
    throw new Error('No passkeys registered for this user');
  }

  // 3. Generate authentication options
  const options = await generateAuthenticationOptions({
    rpID,
    // Allow only the user's registered credentials
    allowCredentials: userCredentialsList.map(cred => ({
      id: cred.id, // base64url string
      type: 'public-key',
    })),
    userVerification: 'preferred',
  });

  // 4. Store challenge for verification
  challenges.set(username, options.challenge);

  return options;
};
