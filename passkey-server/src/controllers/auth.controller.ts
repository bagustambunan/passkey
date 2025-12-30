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
    res.cookie('username', username);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

export const handleProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const incomingCookie = req.headers.cookie ?? '';
    const username = getCookieValue(incomingCookie, 'username');

    if (!username) {
      throw new Error('Username not found in cookie');
    }

    const user = await getUser(username);
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({
      username: user.username,
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
    res.clearCookie('username');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};
