import express, { Router } from 'express';
import {
  handleLogin,
  handleLogout,
  handleGetUser,
} from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/login', handleLogin);
router.get('/user', handleGetUser);
router.get('/logout', handleLogout);

export default router;
