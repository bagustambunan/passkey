import express, { Router } from 'express';
import {
  handleLogin,
  handleLogout,
  handleUser,
} from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', handleLogin);
router.get('/user', handleUser);
router.get('/logout', handleLogout);

export default router;
