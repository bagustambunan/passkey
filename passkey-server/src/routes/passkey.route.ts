import express, { Router } from 'express';
import {
  finishPasskeyRegistration,
  startPasskeyRegistration,
} from '../controllers/passkey.controller';

const router: Router = express.Router();

router.get('/register/start', startPasskeyRegistration);
router.post('/register/finish', finishPasskeyRegistration);

export default router;
