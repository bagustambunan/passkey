import { generateRegistrationOptions } from '@simplewebauthn/server';

const rpID = 'localhost';
const rpName = 'Passkey Demo App';

const challenges = new Map<string, string>();

export const generatePasskeyRegistrationOptions = async (username: string) => {
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
