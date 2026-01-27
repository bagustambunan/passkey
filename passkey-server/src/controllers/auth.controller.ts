import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/auth.service';
import { COOKIE_KEY } from '../constants';
import { formatResponse } from '../utils';
import { getCookieValue } from '../utils/cookie';

export const handleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    res.cookie(COOKIE_KEY.AUTH_USERNAME, username, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json(formatResponse('Login successful', null));
  } catch (error) {
    next(error);
  }
};

export const handleGetUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, COOKIE_KEY.AUTH_USERNAME);

    if (!username) {
      throw new Error('No auth');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json(
      formatResponse('Get user successful', {
        username: user.username,
        name: user.name,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const handleLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.clearCookie(COOKIE_KEY.AUTH_USERNAME);
    res.status(200).json(formatResponse('Logout successful', null));
  } catch (error) {
    next(error);
  }
};
