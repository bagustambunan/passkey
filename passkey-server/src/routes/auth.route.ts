import express, { Router } from 'express';
import {
  handleLogin,
  handleLogout,
  handleProfile,
} from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', handleLogin);
router.get('/profile', handleProfile);
router.get('/logout', handleLogout);

export default router;
