import { NextFunction, Request, Response } from 'express';
import { getUser } from '../services/auth.service';
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
    res.cookie('AUTH_USERNAME', username, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

export const handleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, 'AUTH_USERNAME');

    if (!username) {
      throw new Error('Username not found in cookie');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      data: {
        username: user.username,
      },
    });
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
    res.clearCookie('AUTH_USERNAME');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};
