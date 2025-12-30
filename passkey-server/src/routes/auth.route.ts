import express, { Router } from 'express';
import { handleProfile } from '../controllers/auth.controller';

const router: Router = express.Router();

router.get('/profile', handleProfile);

export default router;
