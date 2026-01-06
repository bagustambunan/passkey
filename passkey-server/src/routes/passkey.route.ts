import express, { Router } from 'express';
import {
  finishPasskeyAuthentication,
  finishPasskeyRegistration,
  startPasskeyAuthentication,
  startPasskeyRegistration,
} from '../controllers/passkey.controller';

const router: Router = express.Router();

router.get('/register-start', startPasskeyRegistration);
router.post('/register-finish', finishPasskeyRegistration);
router.post('/login-start', startPasskeyAuthentication);
router.post('/login-finish', finishPasskeyAuthentication);

export default router;
