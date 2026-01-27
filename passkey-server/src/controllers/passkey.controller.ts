import { Request, Response, NextFunction } from 'express';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { getUser, updateUser } from '../services/auth.service';
import { COOKIE_KEY, RP_ID, RP_NAME, ORIGIN } from '../constants';
import { formatResponse } from '../utils';
import { getCookieValue } from '../utils/cookie';

export const startPasskeyRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, COOKIE_KEY.AUTH_USERNAME);

    if (!username) {
      throw new Error('Not authenticated');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    const options = await generateRegistrationOptions({
      rpName: RP_NAME,
      rpID: RP_ID,
      userID: username, // simplistic user ID, usually should be a stable ID
      userName: user.username,
      attestationType: 'none',
      // Prevent re-registration of same authenticator
      excludeCredentials: user.authenticators?.map(authenticator => ({
        id: authenticator.credentialID,
        type: 'public-key',
        transports: authenticator.transports,
      })),
      authenticatorSelection: {
        residentKey: 'preferred',
        userVerification: 'preferred',
        authenticatorAttachment: 'platform',
      },
    });

    await updateUser(username, { currentChallenge: options.challenge });

    res.status(200).json(formatResponse('Registration options generated', options));
  } catch (error) {
    next(error);
  }
};

export const finishPasskeyRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, COOKIE_KEY.AUTH_USERNAME);

    if (!username) {
      throw new Error('Not authenticated');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    const { body } = req;

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: body,
        expectedChallenge: user.currentChallenge as string,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
      });
    } catch (error) {
      throw new Error('Verification failed');
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;
      
      const newAuthenticator = {
        credentialID,
        credentialPublicKey,
        counter,
        transports: body.response.transports,
      };

      const authenticators = user.authenticators || [];
      authenticators.push(newAuthenticator);

      await updateUser(username, {
        authenticators,
        currentChallenge: undefined,
      });

      res.status(200).json(formatResponse('Passkey registered successfully', { verified }));
    } else {
      throw new Error('Verification failed');
    }
  } catch (error) {
    next(error);
  }
};

export const startPasskeyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username } = req.body;
    if (!username) {
      throw new Error('Username is required');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    const options = await generateAuthenticationOptions({
      rpID: RP_ID,
      allowCredentials: user.authenticators?.map(authenticator => ({
        id: authenticator.credentialID,
        type: 'public-key',
        transports: authenticator.transports,
      })),
      userVerification: 'preferred',
    });

    await updateUser(username, { currentChallenge: options.challenge });

    res.status(200).json(formatResponse('Authentication options generated', options));
  } catch (error) {
    next(error);
  }
};

export const finishPasskeyAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username } = req.body; // Client must send username along with passkey response
    if (!username) {
      throw new Error('Username is required');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    const { response } = req.body; // The actual WebAuthn response

    // Need to find which authenticator is being used to verify
    // However, verifyAuthenticationResponse handles looking up the public key if we pass the authenticator
    // But verifyAuthenticationResponse expects `authenticator` object which has credentialPublicKey.
    // We need to find the authenticator by credentialID from the response.
    
    // req.body should be the JSON from client.
    // req.body.id is the credential ID base64url encoded usually.
    
    const body = req.body;
    const credentialID = body.id;

    const authenticator = user.authenticators?.find(auth => {
        // credentialID in DB is Uint8Array, body.id is Base64URL string.
        // We need to convert or compare properly.
        // SimpleWebAuthn provides isoBase64URL.toBuffer for comparison or we can just iterate.
        // Actually, verifyAuthenticationResponse takes `authenticator` arg: 
        // { credentialPublicKey: Uint8Array, credentialID: Uint8Array, counter: number }
        
        // Since we are iterating, let's use the helper if available or simple check.
        // For now, let's let verifyAuthenticationResponse find it? No, we must provide it.
        // Wait, `verifyAuthenticationResponse` signature:
        // ({ response, expectedChallenge, expectedOrigin, expectedRPID, authenticator, ... })
        // It needs THE authenticator that matches the credential ID.
        return true; // We'll find it below
    });

    // Helper to match ID
    // We can't import isoBase64URL easily if not exported. 
    // But wait, `body.id` is string. `auth.credentialID` is Buffer/Uint8Array.
    // We can use Buffer.from(body.id, 'base64url') (Node 16+) or similar.
    
    // Let's iterate and compare.
    const targetAuthenticator = user.authenticators?.find(auth => {
        return Buffer.from(auth.credentialID).equals(Buffer.from(credentialID, 'base64url')); // Node 14+ supports 'base64url'
        // If 'base64url' encoding is not supported in the node version, we might need a replacement. 
        // Node 20 is used according to user info (or inferred).
    });

    if (!targetAuthenticator) {
      throw new Error('Authenticator not found');
    }

    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: body,
        expectedChallenge: user.currentChallenge as string,
        expectedOrigin: ORIGIN,
        expectedRPID: RP_ID,
        authenticator: {
            ...targetAuthenticator,
            // transport is not needed here
        },
      });
    } catch (error) {
      throw new Error('Verification failed');
    }

    const { verified, authenticationInfo } = verification;

    if (verified && authenticationInfo) {
      const { newCounter } = authenticationInfo;
      
      // Update counter
      targetAuthenticator.counter = newCounter;
      await updateUser(username, { 
          authenticators: user.authenticators,
          currentChallenge: undefined 
      });

      res.cookie(COOKIE_KEY.AUTH_USERNAME, username, {
        httpOnly: true,
        secure: true, // Should be true if https or localhost? secure=true might fail on http://localhost depending on browser. 
                      // Express res.cookie 'secure: true' usually requires https. 
                      // But for localhost development it might be fine or ignored. 
                      // The existing auth controller used secure: true.
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      res.status(200).json(formatResponse('Login successful', { verified }));
    } else {
      throw new Error('Verification failed');
    }
  } catch (error) {
    next(error);
  }
};
