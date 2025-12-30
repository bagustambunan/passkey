import { NextFunction, Request, Response } from 'express';

export const handleProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(200).json({ message: 'Profile' });
};
