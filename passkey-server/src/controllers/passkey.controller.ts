import { Request, Response, NextFunction } from 'express';
import { getCookieValue } from '../utils/cookie';
import { generatePasskeyRegistrationOptions } from '../services/passkey.service';

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

    res.status(200).json(options);
  } catch (error) {
    next(error);
  }
};
