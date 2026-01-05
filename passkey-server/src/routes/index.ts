import express, { Router } from 'express';
import authRoutes from './auth.route';
import passkeyRoutes from './passkey.route';

const router: Router = express.Router();
router.use('/auth', authRoutes);
router.use('/passkey', passkeyRoutes);

export default router;
