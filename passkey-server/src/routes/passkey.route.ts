import express, { Router } from 'express';
import {
  finishPasskeyRegistration,
  startPasskeyAuthentication,
  startPasskeyRegistration,
} from '../controllers/passkey.controller';

const router: Router = express.Router();

router.get('/register/start', startPasskeyRegistration);
router.post('/register/finish', finishPasskeyRegistration);
router.post('/login/start', startPasskeyAuthentication);

export default router;
