import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const msg = err.message || 'Internal Server Error';
  res.status(500).json({ message: msg });
};
