import { Request, Response, NextFunction } from 'express';
import { getCookieValue } from '../utils/cookie';
import {
  generatePasskeyAuthenticationOptions,
  generatePasskeyRegistrationOptions,
  verifyPasskeyRegistration,
} from '../services/passkey.service';
import { StringifiedCredential } from '../types/model';

export const startPasskeyRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, 'AUTH_USERNAME');

    if (!username) {
      throw new Error('No auth');
    }

    const options = await generatePasskeyRegistrationOptions(username);

    res.status(200).json({
      data: options,
    });
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
    const username = getCookieValue(incomingCookie, 'AUTH_USERNAME');

    if (!username) {
      throw new Error('No auth');
    }

    const credential: StringifiedCredential = req.body;

    if (!credential) {
      throw new Error('Credential data is required');
    }

    // Validate credential structure
    if (!credential.id) {
      throw new Error('Missing credential ID');
    }
    if (!credential.response) {
      throw new Error('Missing credential response');
    }
    if (!credential.response.clientDataJSON) {
      throw new Error('Missing clientDataJSON');
    }
    if (!credential.response.attestationObject) {
      throw new Error('Missing attestationObject');
    }

    // Verify and save credential
    const result = await verifyPasskeyRegistration(username, credential);

    res.status(200).json({
      message: 'Passkey registered successfully',
      data: {
        verified: result.verified,
      },
    });
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
    // 1. Get username from request body
    const { username } = req.body;

    if (!username) {
      throw new Error('Username is required');
    }

    // 2. Generate authentication options
    const options = await generatePasskeyAuthenticationOptions(username);

    // 3. Return options to client
    res.status(200).json({
      data: options,
    });
  } catch (error) {
    next(error);
  }
};
